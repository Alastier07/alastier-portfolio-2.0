import { getExperiences } from "@/lib/api";
import ExperienceCarousel from "./ExperienceCarousel";

export default async function Experience() {
  const experiences = await getExperiences();

  // If no experiences, don't render the section
  if (!experiences || experiences.length === 0) {
    return null;
  }

  return (
    <section id="experience" className="mb-20 scroll-mt-32">
      <div className="flex justify-between items-end mb-8 border-b pb-2">
        <h2 className="text-2xl font-semibold">Experience</h2>
      </div>
      
      <div className="-mx-6 px-6 md:-mx-0 md:px-0">
        <ExperienceCarousel experiences={experiences} />
      </div>
    </section>
  );
}
