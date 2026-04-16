import type { PortfolioProject } from '@/lib/site-data';

export default function ProjectCard({ project }: { project: PortfolioProject }) {
  return (
    <article className="card projectCard">
      <p className="eyebrow">{project.industry}</p>
      <h3>{project.title}</h3>
      <p>
        <strong>Challenge:</strong> {project.challenge}
      </p>
      <p>
        <strong>Solution:</strong> {project.solution}
      </p>
      <p>
        <strong>Outcome:</strong> {project.outcome}
      </p>
    </article>
  );
}
