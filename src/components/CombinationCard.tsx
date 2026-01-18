'use client'

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

export default function CombinationCard({ combination }: CombinationCardProps) {
  const outcome: OutcomeFactors = generateOutcome(
    combination.location,
    combination.familyContext,
    combination.lifestyle
  )

  return (
    <div className="group h-[400px] relative rounded-lg border-2 border-gray-200 bg-white overflow-hidden shadow-sm">
      {/* Dimension Info - Visible by default, hidden on hover */}
      <div className="h-full flex flex-col p-6 transition-opacity duration-300 group-hover:opacity-0 group-hover:pointer-events-none">
        <div className="flex-1 flex flex-col justify-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            {combination.location.title}
          </h3>
          
          <div className="space-y-3 text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
              <span className="text-sm">{combination.location.description}</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="text-sm">{combination.familyContext.title}</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <span className="text-sm">{combination.lifestyle.title}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center">Hover to see scores</p>
        </div>
      </div>

      {/* Scores - Hidden by default, visible on hover */}
      <div className="absolute inset-0 h-full flex flex-col p-6 opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100 group-hover:pointer-events-auto">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          {combination.location.title}
        </h3>

        <div className="flex-1 space-y-4">
          {scoreParameters.map((param) => {
            const score = outcome.scores[param.key]
            const percentage = (score / 5) * 100
            const color = getScoreColor(score, param.key)

            return (
              <div key={param.key} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{param.emoji}</span>
                    <span className="text-sm font-medium text-gray-700">{param.label}</span>
                  </div>
                </div>
                <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
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

