import ProjectCard from '@/components/portfolio/ProjectCard';
import { portfolioProjects } from '@/lib/site-data';

export default function PortfolioPage() {
  return (
    <section className="container section">
      <p className="eyebrow">Case Studies</p>
      <h1>Proven results for security-sensitive businesses</h1>
      <p className="lead">
        Examples of private LLM systems we delivered for teams where confidentiality,
        compliance, and uptime matter.
      </p>
      <div className="grid cards2">
        {portfolioProjects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
