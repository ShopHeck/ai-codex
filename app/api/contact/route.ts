import { NextRequest, NextResponse } from 'next/server';

type ContactPayload = {
  company: string;
  useCase: string;
  securityRequirements: string;
  timeline: string;
  website?: string;
};

class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const WEBHOOK_TIMEOUT_MS = 8000;

const requestTracker = new Map<string, { count: number; resetAt: number }>();

function getClientKey(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for') ?? 'unknown-ip';
  const firstForwardedIp = forwardedFor.split(',')[0]?.trim() || 'unknown-ip';
  const userAgent = (request.headers.get('user-agent') ?? 'unknown-agent').slice(0, 120);

  return `${firstForwardedIp}:${userAgent}`;
}

function pruneExpiredRequestTracker(now: number): void {
  for (const [key, entry] of requestTracker.entries()) {
    if (entry.resetAt < now) {
      requestTracker.delete(key);
    }
  }
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  pruneExpiredRequestTracker(now);

  const current = requestTracker.get(key);

  if (!current) {
    requestTracker.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  current.count += 1;
  requestTracker.set(key, current);
  return false;
}

function validatePayload(raw: unknown): ContactPayload {
  if (!raw || typeof raw !== 'object') {
    throw new ValidationError('Invalid request payload.');
  }

  const payload = raw as Record<string, unknown>;

  const company = String(payload.company ?? '').trim();
  const useCase = String(payload.useCase ?? '').trim();
  const securityRequirements = String(payload.securityRequirements ?? '').trim();
  const timeline = String(payload.timeline ?? '').trim();
  const website = String(payload.website ?? '').trim();

  if (website.length > 0) {
    throw new ValidationError('Spam detected.');
  }

  if (company.length < 2 || company.length > 120) {
    throw new ValidationError('Company must be between 2 and 120 characters.');
  }

  if (useCase.length < 20 || useCase.length > 1500) {
    throw new ValidationError('Use case must be between 20 and 1500 characters.');
  }

  if (securityRequirements.length < 5 || securityRequirements.length > 1000) {
    throw new ValidationError('Security requirements must be between 5 and 1000 characters.');
  }

  if (timeline.length < 2 || timeline.length > 120) {
    throw new ValidationError('Timeline must be between 2 and 120 characters.');
  }

  return { company, useCase, securityRequirements, timeline, website: '' };
}

async function deliverInquiry(payload: ContactPayload): Promise<void> {
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  const inquiryRecord = {
    ...payload,
    createdAt: new Date().toISOString(),
    source: 'contact_form',
  };

  if (!webhookUrl) {
    console.info('CONTACT_WEBHOOK_URL is not configured; inquiry logged only.', inquiryRecord);
    return;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS);

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiryRecord),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error('Webhook delivery failed.');
    }
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error('Webhook request timed out.');
    }

    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(request: NextRequest) {
  const clientKey = getClientKey(request);

  if (isRateLimited(clientKey)) {
    return NextResponse.json(
      {
        message: 'Too many submissions. Please wait a few minutes and try again.',
      },
      { status: 429 },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json({ message: 'Malformed JSON request body.' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Invalid request payload.' }, { status: 400 });
  }

  let payload: ContactPayload;
  try {
    payload = validatePayload(json);
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Invalid request payload.' }, { status: 400 });
  }

  try {
    await deliverInquiry(payload);

    return NextResponse.json({
      message: 'Thanks. Your inquiry was submitted successfully.',
    });
  } catch (error) {
    console.error('Contact submission failed', error);
    return NextResponse.json(
      {
        message: 'We could not submit your inquiry right now. Please try again shortly.',
      },
      { status: 500 },
    );
  }
}
