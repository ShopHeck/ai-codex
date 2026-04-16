"use client";

import { FormEvent, useState } from "react";

type SubmissionState =
  | { type: "idle" }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

export default function ContactPage() {
  const [submissionState, setSubmissionState] = useState<SubmissionState>({
    type: "idle",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setIsSubmitting(true);
    setSubmissionState({ type: "idle" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: formData.get("company"),
          useCase: formData.get("useCase"),
          securityRequirements: formData.get("securityRequirements"),
          timeline: formData.get("timeline"),
          website: formData.get("website"),
        }),
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        setSubmissionState({
          type: "error",
          message: payload.message ?? "Submission failed. Please try again.",
        });
        return;
      }

      setSubmissionState({
        type: "success",
        message:
          payload.message ??
          "Thanks—your request is in. We will respond with next steps shortly.",
      });
      form.reset();
    } catch {
      setSubmissionState({
        type: "error",
        message:
          "We could not submit your request due to a network error. Please retry.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="container">
      <section className="card">
        <h1>Project Qualification</h1>
        <p>
          Share your goals so we can scope the fastest path to launch and ROI.
        </p>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "0.75rem" }}>
          <label>
            Company
            <input name="company" required minLength={2} maxLength={120} />
          </label>

          <label>
            Primary use case
            <textarea name="useCase" required minLength={20} maxLength={1500} />
          </label>

          <label>
            Security requirements
            <textarea
              name="securityRequirements"
              required
              minLength={5}
              maxLength={1000}
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
            style={{ position: "absolute", left: "-9999px" }}
          />

          <button className="button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit qualification"}
          </button>
        </form>

        {submissionState.type !== "idle" && (
          <p
            role="status"
            style={{
              marginTop: "1rem",
              color: submissionState.type === "success" ? "#166534" : "#b91c1c",
            }}
          >
            {submissionState.message}
          </p>
        )}
      </section>
    </main>
  );
}
