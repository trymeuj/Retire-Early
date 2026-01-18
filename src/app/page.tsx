'use client'

import { useState } from 'react'
import { generateCombinations } from '@/data/combinations'
import CombinationCard from '@/components/CombinationCard'
import DimensionSection from '@/components/DimensionSection'
import OutcomeVisualization from '@/components/OutcomeVisualization'
import { Introduction } from '@/components/Introduction'
import { locationOptions, familyContextOptions, lifestyleOptions } from '@/data/options'
import { generateOutcome } from '@/data/outcomes'
import { UserSelections, LocationOption, FamilyContextOption, LifestyleOption } from '@/types'

export default function Home() {
  const [showHero, setShowHero] = useState(true)
  const combinations = generateCombinations()
  const [selections, setSelections] = useState<UserSelections>({
    location: null,
    familyContext: null,
    lifestyle: null,
  })

  const handleLocationSelect = (option: LocationOption) => {
    setSelections((prev) => ({ ...prev, location: option }))
  }

  const handleFamilyContextSelect = (option: FamilyContextOption) => {
    setSelections((prev) => ({ ...prev, familyContext: option }))
  }

  const handleLifestyleSelect = (option: LifestyleOption) => {
    setSelections((prev) => ({ ...prev, lifestyle: option }))
  }

  const outcome = generateOutcome(
    selections.location,
    selections.familyContext,
    selections.lifestyle
  )

  const hasSelections = !!(selections.location && selections.familyContext && selections.lifestyle)

  if (showHero) {
    return <Introduction onStart={() => setShowHero(false)} />
  }

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-amber-50 via-rose-50 to-teal-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-light text-gray-900 mb-4">
            Explore Early Retirement
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover what your life could look like. Hover over any card to see the scores, or customize your own combination below.
          </p>
        </div>

        {/* Pre-configured Combination Cards Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Pre-configured Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {combinations.map((combination) => (
              <CombinationCard key={combination.id} combination={combination} />
            ))}
          </div>
        </div>

        {/* Customize Your Own Combination */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Customize Your Combination</h2>
          
          {/* Dimension Sections */}
          <div className="space-y-4 mb-8">
            <DimensionSection
              title="Where do you want to live?"
              selectedValue={selections.location?.title || null}
              options={locationOptions}
              selectedOption={selections.location}
              onSelect={handleLocationSelect}
              color="teal"
              icon={
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
            />

            <DimensionSection
              title="What is your family context?"
              selectedValue={selections.familyContext?.title || null}
              options={familyContextOptions}
              selectedOption={selections.familyContext}
              onSelect={handleFamilyContextSelect}
              color="pink"
              icon={
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
            />

            <DimensionSection
              title="What lifestyle do you envision?"
              selectedValue={selections.lifestyle?.title || null}
              options={lifestyleOptions}
              selectedOption={selections.lifestyle}
              onSelect={handleLifestyleSelect}
              color="purple"
              icon={
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              }
            />
          </div>

          {/* Outcome Visualization */}
          <OutcomeVisualization outcome={outcome} hasSelections={hasSelections} />
        </div>
      </div>
    </main>
  )
}

