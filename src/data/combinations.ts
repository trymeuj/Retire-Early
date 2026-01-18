import { LocationOption, FamilyContextOption, LifestyleOption } from '@/types'
import { locationOptions, familyContextOptions, lifestyleOptions } from './options'

export type Combination = {
  id: string
  country: string
  countryCode?: string
  imageUrl: string
  location: LocationOption
  familyContext: FamilyContextOption
  lifestyle: LifestyleOption
}

// Generate country-based combinations with images
export function generateCombinations(): Combination[] {
  const combinations: Combination[] = []

  // Curated country-based combinations
  const curated: Array<{
    country: string
    countryCode?: string
    imageUrl: string
    locationId: string
    familyId: string
    lifestyleId: string
  }> = [
    // Thailand - Chiang Mai - Mountain Village
    {
      country: 'Thailand',
      countryCode: 'TH',
      imageUrl: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=800&fit=crop',
      locationId: 'mountain-village',
      familyId: 'solo',
      lifestyleId: 'travel-oriented',
    },
    // Thailand - Coastal Town
    {
      country: 'Thailand',
      countryCode: 'TH',
      imageUrl: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=800&fit=crop',
      locationId: 'coastal-town',
      familyId: 'partner',
      lifestyleId: 'simple-quiet',
    },
    // Australia - Melbourne - Small City
    {
      country: 'Australia',
      countryCode: 'AU',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=800&fit=crop',
      locationId: 'small-city',
      familyId: 'partner',
      lifestyleId: 'active-outdoor',
    },
    // Australia - Sydney - Coastal Town
    {
      country: 'Australia',
      countryCode: 'AU',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=800&fit=crop',
      locationId: 'coastal-town',
      familyId: 'children',
      lifestyleId: 'mixed',
    },
    // Portugal - Coastal Town
    {
      country: 'Portugal',
      countryCode: 'PT',
      imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      locationId: 'coastal-town',
      familyId: 'solo',
      lifestyleId: 'simple-quiet',
    },
    // Portugal - Small City (Porto)
    {
      country: 'Portugal',
      countryCode: 'PT',
      imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      locationId: 'small-city',
      familyId: 'partner',
      lifestyleId: 'creative',
    },
    // New Zealand - Rural Countryside
    {
      country: 'New Zealand',
      countryCode: 'NZ',
      imageUrl: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      locationId: 'rural-countryside',
      familyId: 'partner',
      lifestyleId: 'active-outdoor',
    },
    // New Zealand - Coastal Town
    {
      country: 'New Zealand',
      countryCode: 'NZ',
      imageUrl: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      locationId: 'coastal-town',
      familyId: 'children',
      lifestyleId: 'mixed',
    },
    // Spain - Coastal Town
    {
      country: 'Spain',
      countryCode: 'ES',
      imageUrl: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&h=800&fit=crop',
      locationId: 'coastal-town',
      familyId: 'extended-family',
      lifestyleId: 'simple-quiet',
    },
    // Spain - Small City (Barcelona)
    {
      country: 'Spain',
      countryCode: 'ES',
      imageUrl: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&h=800&fit=crop',
      locationId: 'small-city',
      familyId: 'solo',
      lifestyleId: 'creative',
    },
    // Vietnam - Small City (Ho Chi Minh)
    {
      country: 'Vietnam',
      countryCode: 'VN',
      imageUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&h=800&fit=crop',
      locationId: 'small-city',
      familyId: 'partner',
      lifestyleId: 'travel-oriented',
    },
    // Vietnam - Coastal Town (Da Nang)
    {
      country: 'Vietnam',
      countryCode: 'VN',
      imageUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&h=800&fit=crop',
      locationId: 'coastal-town',
      familyId: 'solo',
      lifestyleId: 'travel-oriented',
    },
  ]

  curated.forEach((item, index) => {
    const location = locationOptions.find((l) => l.id === item.locationId)
    const familyContext = familyContextOptions.find((f) => f.id === item.familyId)
    const lifestyle = lifestyleOptions.find((l) => l.id === item.lifestyleId)

    if (location && familyContext && lifestyle) {
      combinations.push({
        id: `combo-${index + 1}`,
        country: item.country,
        countryCode: item.countryCode,
        imageUrl: item.imageUrl,
        location,
        familyContext,
        lifestyle,
      })
    }
  })

  // Shuffle to avoid adjacent same countries
  const shuffled = [...combinations]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  
  // Ensure no adjacent same countries by swapping if needed
  for (let i = 1; i < shuffled.length; i++) {
    if (shuffled[i].country === shuffled[i - 1].country) {
      // Find next different country and swap
      for (let j = i + 1; j < shuffled.length; j++) {
        if (shuffled[j].country !== shuffled[i].country) {
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
          break
        }
      }
    }
  }

  return shuffled
}
