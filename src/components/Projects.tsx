import { getProjects } from "@/lib/api";
import Link from "next/link";
import ProjectLink from "./ProjectLink";

function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export default async function Projects() {
  const projects = await getProjects();

  return (
    <section id="projects" className="mb-20 scroll-mt-32">
      <h2 className="text-2xl font-semibold mb-8 border-b pb-2">Selected Projects</h2>
      <div className="grid gap-12">
        {projects.slice(0, 3).map((project) => (
          <div key={project.id} className="group relative flex flex-col sm:flex-row gap-6 sm:gap-8">
            <div className="w-full sm:w-1/3 aspect-video bg-zinc-100 rounded-xl overflow-hidden border shrink-0">
              {project.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={project.image_url} alt={`${project.title} - Custom AI Automation and Web Development by Alastier C.`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-400 bg-zinc-50 transition-colors duration-500 group-hover:bg-zinc-100">
                  <span className="text-xs font-medium uppercase tracking-widest">Image</span>
                </div>
              )}
            </div>

            <div className="flex-1 flex flex-col justify-center">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-3">
                <h3 className="text-xl font-medium group-hover:underline underline-offset-4 decoration-1">
                  {project.title}
                </h3>
                <div className="flex gap-4 mt-2 sm:mt-0">
                  {project.repo_link && (
                    <a
                      href={project.repo_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-foreground transition-colors"
                    >
                      <GithubIcon size={18} />
                    </a>
                  )}
                  {project.link && (
                    <ProjectLink title={project.title} link={project.link} />
                  )}
                </div>
              </div>
              <p className="text-muted leading-relaxed mb-4 max-w-xl text-sm sm:text-base">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-medium px-2 py-1 bg-zinc-100 text-zinc-600 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-medium hover:text-muted transition-colors"
        >
          View All Projects <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
