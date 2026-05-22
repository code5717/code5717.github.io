import { profile } from '../data/profile';
import { displayProjects } from '../lib/projects';
import { IconArrowUpRight } from '../lib/icons';

function ProjectCard({
  project,
  index
}: {
  project: (typeof displayProjects)[number];
  index: number;
}) {
  const cardClass = `project-card panel-frame${project.link ? ' project-card--linked' : ''}`;
  const content = (
    <>
      <div className="project-card__media">
        <img
          src={project.image}
          alt={project.imageAlt}
          width="1586"
          height="992"
          loading="lazy"
          decoding="async"
          sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <span className="project-card__period">{project.period}</span>
      <span className="project-card__index">{String(index + 1).padStart(2, '0')}</span>
      <h3 className="project-card__title">
        {project.name}
        {project.link && (
          <span className="project-card__link-icon" aria-hidden="true">
            <IconArrowUpRight size={14} />
          </span>
        )}
      </h3>
      <p className="project-card__summary">{project.summary}</p>
      <div className="project-card__tags">
        {project.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </>
  );

  if (project.link) {
    return (
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClass}
        data-scale-fade
        data-tilt
        aria-label={`${project.name} (opens in new tab)`}
      >
        {content}
      </a>
    );
  }

  return (
    <article className={cardClass} data-scale-fade data-tilt>
      {content}
    </article>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="content-split" aria-labelledby="projects-heading">
      <div className="section-copy" data-reveal>
        <p className="section-label">Projects</p>
        <h2 id="projects-heading" data-scrub-text>
          Selected projects
        </h2>
        <p>
          Systems shaped for real operating conditions, constrained hardware, and
          measurable performance.
        </p>
        <a
          href={profile.contacts.github}
          target="_blank"
          rel="noopener noreferrer"
          data-magnetic
        >
          View GitHub projects
        </a>
      </div>

      <div className="project-grid" data-reveal style={{ ['--reveal-delay' as string]: '120ms' }}>
        {displayProjects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
