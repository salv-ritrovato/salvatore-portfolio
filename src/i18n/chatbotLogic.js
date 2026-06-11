export function resolveIntent(intent, t) {
  const { responses } = t.chatbot;
  const { site, skills, projects, socials } = t;

  switch (intent) {
    case "greeting":
      return responses.greeting;

    case "about":
      return responses.about(site.name, site.role);

    case "skills": {
      const list = skills.items.map((s) => s.name).join(", ");
      return responses.skills(list);
    }

    case "projects": {
      const list = projects.items.map((p) => `• ${p.title}`).join("\n");
      return responses.projects(list);
    }

    case "contact": {
      const github = socials.find((s) => s.id === "github")?.href ?? "";
      const linkedin = socials.find((s) => s.id === "linkedin")?.href ?? "";
      return responses.contact(site.email, github, linkedin);
    }

    case "availability":
      return responses.availability(site.availability);

    case "easter_egg":
      return responses.easter_egg;

    default:
      return responses.fallback;
  }
}
