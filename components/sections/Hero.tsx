import Link from 'next/link';

export default function Hero() {
  return (
    <section className="hero container">
      <p className="eyebrow">Private AI Consulting for Sensitive Data</p>
      <h1>Deploy secure private-server LLMs without risking your data.</h1>
      <p className="lead">
        We help regulated and security-conscious companies launch on-prem or VPC-hosted
        LLM systems that cut operational costs and accelerate decision-making.
      </p>
      <div className="buttonRow">
        <Link className="button buttonPrimary" href="/contact">
          Book a Security-Focused AI Audit
        </Link>
        <Link className="button buttonSecondary" href="/portfolio">
          View Client Outcomes
        </Link>
      </div>
    </section>
  );
}
