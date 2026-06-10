function normalize(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}

function matchesWord(haystack, needle) {
  const escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return new RegExp(`(?<![\\w])${escaped}(?![\\w])`, 'i').test(haystack)
}

export function resolveIntent(intent, t) {
  const { responses } = t.chatbot
  const { site, skills, projects, socials } = t

  switch (intent) {
    case 'greeting':
      return responses.greeting

    case 'about':
      return responses.about(site.name, site.role)

    case 'skills': {
      const list = skills.items.map((s) => s.name).join(', ')
      return responses.skills(list)
    }

    case 'projects': {
      const list = projects.items.map((p) => `• ${p.title}`).join('\n')
      return responses.projects(list)
    }

    case 'contact': {
      const github = socials.find((s) => s.id === 'github')?.href ?? ''
      const linkedin = socials.find((s) => s.id === 'linkedin')?.href ?? ''
      return responses.contact(site.email, github, linkedin)
    }

    case 'availability':
      return responses.availability(site.availability)

    case 'help':
      return responses.help

    default:
      return responses.fallback
  }
}

export function matchIntent(text, keywords) {
  const normalized = normalize(text)
  if (!normalized) return null

  let best = null
  let bestScore = 0

  for (const [intent, patterns] of Object.entries(keywords)) {
    for (const pattern of patterns) {
      const p = normalize(pattern)
      if (normalized === p) return intent
      if (matchesWord(normalized, p) && p.length > bestScore) {
        best = intent
        bestScore = p.length
      }
    }
  }

  return best
}

export function getChatResponse(input, t) {
  const intent = matchIntent(input, t.chatbot.keywords)
  return resolveIntent(intent ?? 'fallback', t)
}