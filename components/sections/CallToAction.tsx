import Link from 'next/link';

export default function CallToAction() {
  return (
    <section className="container section">
      <div className="cta">
        <h2>Ready to ship private AI that legal and security approve?</h2>
        <p>
          Start with a fixed-scope discovery and architecture sprint tailored to your
          compliance and business goals.
        </p>
        <Link className="button buttonPrimary" href="/contact">
          Start Your Private LLM Project
        </Link>
      </div>
    </section>
  );
}
