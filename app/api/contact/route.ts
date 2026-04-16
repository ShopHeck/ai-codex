import { NextResponse } from 'next/server';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  companyName?: string;
  businessEmail?: string;
  useCase?: string;
  complianceNeeds?: string;
};

function sanitizeValue(value: unknown) {
  return String(value ?? '').trim().replace(/[<>]/g, '');
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;

    const companyName = sanitizeValue(body.companyName);
    const businessEmail = sanitizeValue(body.businessEmail).toLowerCase();
    const useCase = sanitizeValue(body.useCase);
    const complianceNeeds = sanitizeValue(body.complianceNeeds);

    if (!companyName || !businessEmail || !useCase || !complianceNeeds) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 },
      );
    }

    if (!emailPattern.test(businessEmail)) {
      return NextResponse.json({ error: 'Please enter a valid business email.' }, { status: 400 });
    }

    // Placeholder for persistence/webhook integration.
    return NextResponse.json(
      {
        message:
          'Consultation request received. Our team will reply with next steps shortly.',
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { error: 'Invalid request payload. Please review your inputs.' },
      { status: 400 },
    );
  }
}
