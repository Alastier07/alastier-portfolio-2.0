import { getSkills } from "@/lib/api";

export default async function Skills() {
  const skills = await getSkills();
  
  // Group skills by category
  const categories = Array.from(new Set(skills.map(s => s.category)));

  return (
    <section id="skills" className="mb-20 scroll-mt-32">
      <h2 className="text-2xl font-semibold mb-8 border-b pb-2">Skills & Expertise</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        {categories.map(category => (
          <div key={category}>
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted mb-4">{category}</h3>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {skills
                .filter(s => s.category === category)
                .sort((a, b) => b.level - a.level)
                .map(skill => (
                  <div key={skill.id} className="flex flex-col">
                    <span className="text-lg font-medium">{skill.name}</span>
                    <div className="w-24 h-0.5 bg-zinc-100 mt-1 relative overflow-hidden">
                      <div 
                        className="absolute inset-y-0 left-0 bg-foreground transition-all duration-1000 ease-out" 
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
