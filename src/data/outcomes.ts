import { OutcomeFactors, OutcomeScores, ScoreValue, LocationOption, FamilyContextOption, LifestyleOption } from '@/types'

// Type for score adjustments (relative changes, not absolute values)
type ScoreAdjustments = Partial<Record<keyof OutcomeScores, number>>

// Base scores for each location type
const locationScores: Record<string, Partial<OutcomeScores>> = {
  'coastal-town': {
    costOfLiving: 3, // Medium (seasonal demand can raise prices)
    paceOfLife: 2, // Slow
    pollution: 2, // Low
    infrastructure: 3, // Medium
    socialLife: 3, // Medium
  },
  'mountain-village': {
    costOfLiving: 3, // Medium (can be expensive due to tourism)
    paceOfLife: 1, // Very calm
    pollution: 1, // Very clean
    infrastructure: 2, // Limited (remote)
    socialLife: 2, // Limited community
  },
  'suburban-area': {
    costOfLiving: 3, // Medium
    paceOfLife: 3, // Moderate
    pollution: 3, // Moderate
    infrastructure: 4, // Good
    socialLife: 4, // Good (family-friendly)
  },
  'rural-countryside': {
    costOfLiving: 2, // Cheap
    paceOfLife: 1, // Very calm
    pollution: 1, // Very clean
    infrastructure: 2, // Limited
    socialLife: 2, // Isolated
  },
  'small-city': {
    costOfLiving: 3, // Medium
    paceOfLife: 3, // Moderate
    pollution: 3, // Moderate
    infrastructure: 4, // Good
    socialLife: 4, // Good
  },
  'overseas': {
    costOfLiving: 2, // Can be cheap (depends on country)
    paceOfLife: 3, // Varies but generally moderate
    pollution: 3, // Varies
    infrastructure: 3, // Varies by country
    socialLife: 3, // Building new connections
  },
}

// Adjustments based on family context
const familyAdjustments: Record<string, ScoreAdjustments> = {
  'solo': {
    costOfLiving: -1, // Cheaper (single person)
    socialLife: -1, // More isolated
  },
  'partner': {
    costOfLiving: 0, // No change (2 people)
    socialLife: 1, // Better (couple activities)
  },
  'children': {
    costOfLiving: 1, // More expensive (kids cost money)
    infrastructure: 1, // Need schools, activities
    socialLife: 1, // Better (kids help make connections)
  },
  'extended-family': {
    costOfLiving: 1, // More expensive (more people)
    socialLife: 2, // Much better (built-in community)
  },
  'community': {
    costOfLiving: -1, // Cheaper (shared resources)
    socialLife: 2, // Much better (built-in community)
  },
}

// Adjustments based on lifestyle
const lifestyleAdjustments: Record<string, ScoreAdjustments> = {
  'simple-quiet': {
    paceOfLife: -1, // Slower
    socialLife: -1, // More isolated
  },
  'travel-oriented': {
    costOfLiving: 1, // More expensive (travel costs)
    paceOfLife: 1, // More hectic
    socialLife: 0, // Varies
  },
  'creative': {
    paceOfLife: -1, // Slower, focused
    socialLife: 0, // Depends on community
  },
  'active-outdoor': {
    pollution: -1, // Prefer clean environments
    socialLife: 1, // Outdoor communities
  },
  'purpose-driven': {
    socialLife: 1, // Volunteering builds connections
  },
  'mixed': {
    // No specific adjustments
  },
}

function clampScore(score: number): ScoreValue {
  if (score < 1) return 1
  if (score > 5) return 5
  return score as ScoreValue
}

function applyAdjustments(base: Partial<OutcomeScores>, adjustments: ScoreAdjustments): Partial<OutcomeScores> {
  const result: Partial<OutcomeScores> = { ...base }
  
  Object.keys(adjustments).forEach((key) => {
    const adjustmentKey = key as keyof OutcomeScores
    const baseValue = base[adjustmentKey] || 3
    const adjustment = adjustments[adjustmentKey] || 0
    result[adjustmentKey] = clampScore(baseValue + adjustment)
  })
  
  return result
}

function generateOutcomeScores(
  location: LocationOption,
  familyContext: FamilyContextOption,
  lifestyle: LifestyleOption
): OutcomeScores {
  // Start with location base scores
  const base = { ...locationScores[location.id] } as Partial<OutcomeScores>
  
  // Apply family adjustments
  const familyAdj = familyAdjustments[familyContext.id] || {}
  const afterFamily = applyAdjustments(base, familyAdj)
  
  // Apply lifestyle adjustments
  const lifestyleAdj = lifestyleAdjustments[lifestyle.id] || {}
  const final = applyAdjustments(afterFamily, lifestyleAdj)
  
  // Ensure all scores are set (default to 3)
  return {
    costOfLiving: final.costOfLiving || 3,
    paceOfLife: final.paceOfLife || 3,
    pollution: final.pollution || 3,
    infrastructure: final.infrastructure || 3,
    socialLife: final.socialLife || 3,
  }
}

export function generateOutcome(
  location: LocationOption | null,
  familyContext: FamilyContextOption | null,
  lifestyle: LifestyleOption | null
): OutcomeFactors {
  if (!location || !familyContext || !lifestyle) {
    return {
      title: 'Explore Your Options',
      description: 'Select options from each dimension to see what your early retirement could look like.',
      scores: {
        costOfLiving: 3,
        paceOfLife: 3,
        pollution: 3,
        infrastructure: 3,
        socialLife: 3,
      },
      considerations: [],
    }
  }

  const scores = generateOutcomeScores(location, familyContext, lifestyle)

  // Optional considerations (can be expanded/collapsed)
  const considerations: string[] = []

  // Location-based considerations
  if (location.id === 'coastal-town') {
    considerations.push('Access to water activities and coastal community events')
    considerations.push('Potential for seasonal tourism affecting local pace')
  } else if (location.id === 'mountain-village') {
    considerations.push('Year-round outdoor recreation opportunities')
    considerations.push('Possible seasonal weather considerations')
  } else if (location.id === 'overseas') {
    considerations.push('Cultural adaptation and language learning opportunities')
    considerations.push('Healthcare and legal considerations in new country')
  } else if (location.id === 'rural-countryside') {
    considerations.push('Space for self-sufficiency and larger projects')
    considerations.push('Distance from urban amenities and services')
  } else if (location.id === 'small-city') {
    considerations.push('Balance of community resources and personal space')
    considerations.push('Access to cultural events and diverse activities')
  } else if (location.id === 'suburban-area') {
    considerations.push('Family-friendly amenities and community connections')
    considerations.push('Proximity to both nature and urban centers')
  }

  // Generate title and description
  const lifestyleName = lifestyle.title.toLowerCase()
  const familyName = familyContext.title.toLowerCase()
  const familyText = familyName === 'solo living' 
    ? 'on your own' 
    : familyName === 'with partner' 
    ? 'with your partner' 
    : familyName === 'with children' 
    ? 'with your children' 
    : familyName === 'extended family' 
    ? 'with extended family' 
    : 'in community'

  return {
    title: `Life in ${location.title}`,
    description: `A ${lifestyleName} lifestyle ${familyText}.`,
    scores,
    considerations,
  }
}
