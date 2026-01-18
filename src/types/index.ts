export type LocationOption = {
  id: string
  title: string
  description: string
}

export type FamilyContextOption = {
  id: string
  title: string
  description: string
}

export type LifestyleOption = {
  id: string
  title: string
  description: string
}

export type UserSelections = {
  location: LocationOption | null
  familyContext: FamilyContextOption | null
  lifestyle: LifestyleOption | null
}

export type ScoreValue = 1 | 2 | 3 | 4 | 5

export type OutcomeScores = {
  costOfLiving: ScoreValue // 1 = Cheap, 5 = Expensive
  paceOfLife: ScoreValue // 1 = Calm, 5 = Fast/Stressful
  pollution: ScoreValue // 1 = Clean, 5 = Polluted
  infrastructure: ScoreValue // 1 = Limited, 5 = Excellent
  socialLife: ScoreValue // 1 = Isolated, 5 = Social
}

export type OutcomeFactors = {
  title: string
  description: string
  scores: OutcomeScores
  considerations: string[] // Optional, expandable text
}

