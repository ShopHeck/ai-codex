'use client';

import { FormEvent, useState } from 'react';

type SubmissionState =
  | { type: 'idle' }
  | { type: 'success'; message: string }
  | { type: 'error'; message: string };

export default function ContactPage() {
  const [submissionState, setSubmissionState] = useState<SubmissionState>({
    type: 'idle',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    setIsSubmitting(true);
    setSubmissionState({ type: 'idle' });
    setSubmissionState({
      type: 'success',
      message: 'This form is in preview mode. No data has been submitted.',
    });
    form.reset();
    setIsSubmitting(false);
  }

  return (
    <section className="container section">
      <p className="eyebrow">Contact</p>
      <h1>Project qualification</h1>
      <p className="lead">Share your goals so we can scope the fastest path to launch and ROI.</p>

      <form className="form card" onSubmit={handleSubmit}>
        <label>
          Company
          <input name="company" required minLength={2} maxLength={120} />
        </label>

        <label>
          Primary use case
          <textarea name="useCase" required minLength={20} maxLength={1500} rows={4} />
        </label>

        <label>
          Security requirements
          <textarea
            name="securityRequirements"
            required
            minLength={5}
            maxLength={1000}
            rows={3}
          />
        </label>

        <label>
          Target timeline
          <input name="timeline" required minLength={2} maxLength={120} />
        </label>

        <input
          name="website"
          autoComplete="off"
          tabIndex={-1}
          aria-hidden="true"
          style={{ position: 'absolute', left: '-9999px' }}
        />

        <button className="button buttonPrimary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit qualification'}
        </button>

        {submissionState.type !== 'idle' ? (
          <p className={submissionState.type === 'success' ? 'successText' : 'errorText'}>
            {submissionState.message}
          </p>
        ) : null}
      </form>
    </section>
  );
}
