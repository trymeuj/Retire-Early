import { LocationOption, FamilyContextOption, LifestyleOption } from '@/types'
import { locationOptions, familyContextOptions, lifestyleOptions } from './options'

export type Combination = {
  id: string
  location: LocationOption
  familyContext: FamilyContextOption
  lifestyle: LifestyleOption
}

// Generate a curated set of interesting combinations
export function generateCombinations(): Combination[] {
  const combinations: Combination[] = []

  // Curated set of interesting combinations
  const curated: Array<[string, string, string]> = [
    // Coastal + Solo + Simple
    ['coastal-town', 'solo', 'simple-quiet'],
    // Mountain + Partner + Active
    ['mountain-village', 'partner', 'active-outdoor'],
    // Rural + Children + Creative
    ['rural-countryside', 'children', 'creative'],
    // Small City + Partner + Travel
    ['small-city', 'partner', 'travel-oriented'],
    // Suburban + Children + Mixed
    ['suburban-area', 'children', 'mixed'],
    // Overseas + Solo + Travel
    ['overseas', 'solo', 'travel-oriented'],
    // Coastal + Extended Family + Simple
    ['coastal-town', 'extended-family', 'simple-quiet'],
    // Mountain + Community + Purpose
    ['mountain-village', 'community', 'purpose-driven'],
    // Small City + Solo + Creative
    ['small-city', 'solo', 'creative'],
    // Rural + Partner + Active
    ['rural-countryside', 'partner', 'active-outdoor'],
    // Suburban + Partner + Mixed
    ['suburban-area', 'partner', 'mixed'],
    // Overseas + Partner + Travel
    ['overseas', 'partner', 'travel-oriented'],
  ]

  curated.forEach(([locationId, familyId, lifestyleId], index) => {
    const location = locationOptions.find((l) => l.id === locationId)
    const familyContext = familyContextOptions.find((f) => f.id === familyId)
    const lifestyle = lifestyleOptions.find((l) => l.id === lifestyleId)

    if (location && familyContext && lifestyle) {
      combinations.push({
        id: `combo-${index + 1}`,
        location,
        familyContext,
        lifestyle,
      })
    }
  })

  return combinations
}

