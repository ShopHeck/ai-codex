import { NextRequest, NextResponse } from "next/server";

type ContactPayload = {
  company: string;
  useCase: string;
  securityRequirements: string;
  timeline: string;
  website?: string;
};

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const requestTracker = new Map<string, { count: number; resetAt: number }>();

function getClientKey(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for") ?? "unknown-ip";
  const userAgent = request.headers.get("user-agent") ?? "unknown-agent";
  return `${forwardedFor}:${userAgent}`;
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const current = requestTracker.get(key);

  if (!current || current.resetAt < now) {
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
  if (!raw || typeof raw !== "object") {
    throw new Error("Invalid request payload.");
  }

  const payload = raw as Record<string, unknown>;

  const company = String(payload.company ?? "").trim();
  const useCase = String(payload.useCase ?? "").trim();
  const securityRequirements = String(payload.securityRequirements ?? "").trim();
  const timeline = String(payload.timeline ?? "").trim();
  const website = String(payload.website ?? "").trim();

  if (website.length > 0) {
    throw new Error("Spam detected.");
  }

  if (company.length < 2 || company.length > 120) {
    throw new Error("Company must be between 2 and 120 characters.");
  }

  if (useCase.length < 20 || useCase.length > 1500) {
    throw new Error("Use case must be between 20 and 1500 characters.");
  }

  if (securityRequirements.length < 5 || securityRequirements.length > 1000) {
    throw new Error(
      "Security requirements must be between 5 and 1000 characters.",
    );
  }

  if (timeline.length < 2 || timeline.length > 120) {
    throw new Error("Timeline must be between 2 and 120 characters.");
  }

  return { company, useCase, securityRequirements, timeline, website: "" };
}

async function deliverInquiry(payload: ContactPayload): Promise<void> {
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;

  if (!webhookUrl) {
    console.info("CONTACT_WEBHOOK_URL is not configured; inquiry logged only.", {
      company: payload.company,
      timeline: payload.timeline,
    });
    return;
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      createdAt: new Date().toISOString(),
      source: "contact_form",
    }),
  });

  if (!response.ok) {
    throw new Error("Webhook delivery failed.");
  }
}

export async function POST(request: NextRequest) {
  const clientKey = getClientKey(request);

  if (isRateLimited(clientKey)) {
    return NextResponse.json(
      {
        message: "Too many submissions. Please wait a few minutes and try again.",
      },
      { status: 429 },
    );
  }

  try {
    const json = await request.json();
    const payload = validatePayload(json);
    await deliverInquiry(payload);

    return NextResponse.json({
      message: "Thanks. Your inquiry was submitted successfully.",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to process request.";

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { message: "Malformed JSON request body." },
        { status: 400 },
      );
    }
    const isValidationError =
      message.includes("must be between") ||
      message === "Invalid request payload." ||
      message === "Spam detected.";

    if (isValidationError) {
      return NextResponse.json({ message }, { status: 400 });
    }

    console.error("Contact submission failed", error);
    return NextResponse.json(
      {
        message:
          "We could not submit your inquiry right now. Please try again shortly.",
      },
      { status: 500 },
    );
  }
}
