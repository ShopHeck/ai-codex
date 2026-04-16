import Link from "next/link";

export default function HomePage() {
  return (
    <main className="container">
      <section className="card">
        <h1>Launch revenue-ready AI products in weeks.</h1>
        <p>
          We build conversion-focused web apps and automations that reduce manual
          work and create recurring revenue opportunities.
        </p>
        <div className="actions">
          <Link href="/contact" className="button">
            Start Qualification
          </Link>
          <Link href="/portfolio" className="button secondary">
            See Portfolio
          </Link>
        </div>
      </section>
    </main>
  );
}
