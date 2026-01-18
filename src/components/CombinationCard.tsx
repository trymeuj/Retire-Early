'use client'

import Image from 'next/image'
import { Combination } from '@/data/combinations'
import { generateOutcome } from '@/data/outcomes'
import { OutcomeFactors } from '@/types'

interface CombinationCardProps {
  combination: Combination
}

const scoreParameters = [
  { key: 'costOfLiving' as const, label: 'Cost', emoji: '💵' },
  { key: 'paceOfLife' as const, label: 'Pace', emoji: '⏱️' },
  { key: 'pollution' as const, label: 'Pollution', emoji: '🌱' },
  { key: 'infrastructure' as const, label: 'Infrastructure', emoji: '🏥' },
  { key: 'socialLife' as const, label: 'Social', emoji: '👥' },
]

function getScoreColor(score: number, paramKey: string): string {
  const reverseScale = paramKey === 'infrastructure' || paramKey === 'socialLife'
  
  if (reverseScale) {
    if (score >= 4) return 'bg-green-500'
    if (score === 3) return 'bg-yellow-500'
    return 'bg-red-500'
  } else {
    if (score <= 2) return 'bg-green-500'
    if (score === 3) return 'bg-yellow-500'
    return 'bg-red-500'
  }
}

// Get location type tag
function getLocationTypeTag(locationId: string): string {
  const map: Record<string, string> = {
    'coastal-town': 'Coastal',
    'mountain-village': 'Mountain',
    'rural-countryside': 'Rural',
    'small-city': 'Urban',
    'suburban-area': 'Suburban',
    'overseas': 'Overseas',
  }
  return map[locationId] || 'Urban'
}

export default function CombinationCard({ combination }: CombinationCardProps) {
  const outcome: OutcomeFactors = generateOutcome(
    combination.location,
    combination.familyContext,
    combination.lifestyle
  )

  const locationTypeTag = getLocationTypeTag(combination.location.id)

  return (
    <div className="group aspect-square relative rounded-lg border-2 border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
      {/* Country Image with Overlay - Visible by default */}
      <div className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-0 group-hover:pointer-events-none">
        <div className="relative w-full h-full">
          <Image
            src={combination.imageUrl}
            alt={combination.country}
            fill
            className="object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="text-3xl font-bold mb-4">{combination.country}</h3>
            
            {/* Tags for 3 Dimensions */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm border border-white/30">
                {locationTypeTag}
              </span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm border border-white/30">
                {combination.familyContext.title}
              </span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm border border-white/30">
                {combination.lifestyle.title}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scores - Hidden by default, visible on hover */}
      <div className="absolute inset-0 h-full w-full flex flex-col p-4 bg-white opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100 group-hover:pointer-events-auto z-10">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          {combination.country}
        </h3>

        <div className="flex-1 min-h-0 flex flex-col justify-center space-y-2.5">
          {scoreParameters.map((param) => {
            const score = outcome.scores[param.key]
            const percentage = (score / 5) * 100
            const color = getScoreColor(score, param.key)

            return (
              <div key={param.key} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">{param.emoji}</span>
                    <span className="text-xs font-medium text-gray-700">{param.label}</span>
                  </div>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${color} rounded-full transition-all duration-300`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
