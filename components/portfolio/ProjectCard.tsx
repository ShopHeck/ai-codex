import Link from "next/link";

export type TrustSignal = {
  deploymentModel: string;
  complianceConsiderations: string[];
  securityControls: string[];
};

export type ProjectMetadata = {
  title: string;
  industry: string;
  problem: string;
  privateLlmArchitecture: string;
  measurableOutcome: string;
  trustSignal: TrustSignal;
  ctaLabel: string;
  ctaHref: string;
};

type ProjectCardProps = {
  project: ProjectMetadata;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-2xl font-semibold text-slate-900">{project.title}</h2>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
          {project.industry}
        </span>
      </div>

      <div className="space-y-3 text-slate-700">
        <p>
          <span className="font-semibold text-slate-900">Problem:</span> {project.problem}
        </p>
        <p>
          <span className="font-semibold text-slate-900">Private LLM Architecture:</span>{" "}
          {project.privateLlmArchitecture}
        </p>
        <p>
          <span className="font-semibold text-slate-900">Measurable Outcome:</span>{" "}
          {project.measurableOutcome}
        </p>
      </div>

      <section className="mt-5 rounded-xl bg-slate-50 p-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">Trust Signals</h3>
        <p className="mt-2 text-sm text-slate-700">
          <span className="font-semibold text-slate-900">Deployment Model:</span>{" "}
          {project.trustSignal.deploymentModel}
        </p>

        <div className="mt-3">
          <p className="text-sm font-semibold text-slate-900">Compliance Considerations</p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-slate-700">
            {project.trustSignal.complianceConsiderations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-3">
          <p className="text-sm font-semibold text-slate-900">Security Controls</p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-slate-700">
            {project.trustSignal.securityControls.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <Link
        href={project.ctaHref}
        className="mt-5 inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
      >
        {project.ctaLabel}
      </Link>
    </article>
  );
}
