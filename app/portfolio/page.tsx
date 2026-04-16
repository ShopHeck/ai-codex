import Link from "next/link";

const projects = [
  {
    title: "Lead Intake Automation",
    result: "Cut qualification time by 72% with webhook-first triage.",
  },
  {
    title: "Subscription Analytics Dashboard",
    result: "Increased expansion revenue by 19% using churn-risk alerts.",
  },
];

export default function PortfolioPage() {
  return (
    <main className="container">
      <section className="card">
        <h1>Portfolio</h1>
        <p>Productized systems built for measurable ROI.</p>
        <ul>
          {projects.map((project) => (
            <li key={project.title}>
              <strong>{project.title}</strong>: {project.result}
            </li>
          ))}
        </ul>
        <div className="actions">
          <Link href="/contact" className="button">
            Book Your Build Sprint
          </Link>
          <Link href="/" className="button secondary">
            Back Home
          </Link>
        </div>
      </section>
    </main>
  );
}
