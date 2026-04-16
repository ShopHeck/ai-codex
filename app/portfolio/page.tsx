import Link from "next/link";

import ProjectCard, { ProjectMetadata } from "@/components/portfolio/ProjectCard";

const portfolioProjects: ProjectMetadata[] = [
  {
    title: "Clinical Documentation Copilot",
    industry: "Healthcare",
    problem:
      "Providers spent 2.3 hours daily on manual charting, creating bottlenecks in patient throughput and billing cycles.",
    privateLlmArchitecture:
      "HIPAA-aligned VPC deployment with retrieval-augmented generation over isolated EHR extracts, PHI redaction pipeline, and model routing between private open-weight and domain-tuned models.",
    measurableOutcome:
      "Reduced chart completion time by 64%, increased same-day claim submission by 28%, and saved approximately $41K monthly in admin overhead.",
    trustSignal: {
      deploymentModel: "Single-tenant private cloud (customer-owned VPC) with optional on-prem inference node.",
      complianceConsiderations: ["HIPAA", "SOC 2 Type II controls mapped", "BAA support"],
      securityControls: [
        "Data encrypted in transit (TLS 1.3) and at rest (AES-256)",
        "Zero-retention LLM policies for PHI prompts",
        "Audit trails with role-scoped access logging",
      ],
    },
    ctaLabel: "Request Healthcare Case Study",
    ctaHref: "/contact?use_case=healthcare-llm",
  },
  {
    title: "Supplier Risk Intelligence Assistant",
    industry: "Manufacturing",
    problem:
      "Global procurement teams relied on fragmented vendor data, delaying risk escalation and increasing stockout exposure.",
    privateLlmArchitecture:
      "Private LLM gateway with policy enforcement, vector index on internal ERP + supplier feeds, and agent workflow for summarization, anomaly scoring, and escalation drafting.",
    measurableOutcome:
      "Cut supplier risk review cycle from 5 days to 7 hours, reduced emergency sourcing incidents by 19%, and protected $8.2M in annualized revenue.",
    trustSignal: {
      deploymentModel: "Hybrid deployment: on-prem data connectors with private cloud inference and region pinning.",
      complianceConsiderations: [
        "ISO 27001-aligned controls",
        "GDPR data residency workflows for EU suppliers",
        "Vendor DPA-ready architecture",
      ],
      securityControls: [
        "SSO + SCIM with least-privilege RBAC",
        "Prompt firewall with sensitive field masking",
        "Signed webhook events for SOC monitoring",
      ],
    },
    ctaLabel: "View Manufacturing Results",
    ctaHref: "/contact?use_case=manufacturing-risk",
  },
  {
    title: "Private Wealth Advisor Assistant",
    industry: "Financial Services",
    problem:
      "Advisors manually prepared portfolio review packets, slowing client response times and reducing upsell opportunities.",
    privateLlmArchitecture:
      "Private model orchestration layer with retrieval over approved investment research, compliance pre-check engine, and human-in-the-loop approval queue.",
    measurableOutcome:
      "Increased advisor client capacity by 32%, accelerated proposal turnaround by 58%, and improved upsell conversion by 14%.",
    trustSignal: {
      deploymentModel: "Dedicated single-tenant SaaS instance with customer-managed keys (CMK).",
      complianceConsiderations: [
        "SEC/FINRA supervision workflow compatibility",
        "SOC 2 evidence-ready control mapping",
        "Configurable retention schedules for regulated communications",
      ],
      securityControls: [
        "Field-level encryption for account identifiers",
        "Dual-approval workflow for high-risk outputs",
        "Continuous vulnerability scanning with monthly penetration testing",
      ],
    },
    ctaLabel: "Book a Secure Demo",
    ctaHref: "/contact?use_case=wealth-assistant",
  },
];

export default function PortfolioPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-600">Portfolio</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
          Private AI systems built for revenue and risk-sensitive teams
        </h1>
        <p className="mt-4 text-lg text-slate-700">
          Explore production case studies that combine measurable ROI with enterprise-grade data security,
          compliance readiness, and deployment flexibility.
        </p>
      </header>

      <section className="mt-10 grid gap-6">
        {portfolioProjects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </section>

      <section className="mt-12 rounded-2xl bg-slate-900 p-8 text-white">
        <h2 className="text-2xl font-semibold">Need a private LLM roadmap for your team?</h2>
        <p className="mt-2 text-slate-200">
          We design fast-launch pilots that convert into secure, scalable automation programs.
        </p>
        <Link
          href="/contact"
          className="mt-5 inline-flex items-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
        >
          Start a confidential conversation
        </Link>
      </section>
    </main>
  );
}
