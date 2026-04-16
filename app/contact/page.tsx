'use client';

import { FormEvent, useState } from 'react';

type FormState = {
  companyName: string;
  businessEmail: string;
  useCase: string;
  complianceNeeds: string;
};

const initialState: FormState = {
  companyName: '',
  businessEmail: '',
  useCase: '',
  complianceNeeds: '',
};

export default function ContactPage() {
  const [formData, setFormData] = useState<FormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        setError(result.error ?? 'Request failed. Please try again.');
        return;
      }

      setMessage(result.message ?? 'Thanks. We will reach out within one business day.');
      setFormData(initialState);
    } catch {
      setError('Network error. Please retry in a moment.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="container section">
      <p className="eyebrow">Contact</p>
      <h1>Book your private LLM consultation</h1>
      <p className="lead">
        Tell us your security and business priorities. We will send a proposed plan and
        timeline.
      </p>

      <form className="form card" onSubmit={handleSubmit}>
        <label>
          Company name
          <input
            required
            value={formData.companyName}
            onChange={(event) => setFormData((prev) => ({ ...prev, companyName: event.target.value }))}
          />
        </label>

        <label>
          Business email
          <input
            required
            type="email"
            value={formData.businessEmail}
            onChange={(event) => setFormData((prev) => ({ ...prev, businessEmail: event.target.value }))}
          />
        </label>

        <label>
          Primary use case
          <textarea
            required
            rows={4}
            value={formData.useCase}
            onChange={(event) => setFormData((prev) => ({ ...prev, useCase: event.target.value }))}
          />
        </label>

        <label>
          Compliance and security needs
          <textarea
            required
            rows={3}
            value={formData.complianceNeeds}
            onChange={(event) =>
              setFormData((prev) => ({ ...prev, complianceNeeds: event.target.value }))
            }
          />
        </label>

        <button className="button buttonPrimary" disabled={isSubmitting} type="submit">
          {isSubmitting ? 'Submitting...' : 'Request Consultation'}
        </button>

        {message ? <p className="successText">{message}</p> : null}
        {error ? <p className="errorText">{error}</p> : null}
      </form>
    </section>
  );
}
