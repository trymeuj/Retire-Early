'use client'

import { useState } from 'react'
import { OutcomeFactors } from '@/types'

interface OutcomeVisualizationProps {
  outcome: OutcomeFactors
  hasSelections: boolean
}

type ScoreParameter = {
  key: keyof OutcomeFactors['scores']
  label: string
  lowLabel: string
  highLabel: string
  emoji: string
}

const parameters: ScoreParameter[] = [
  {
    key: 'costOfLiving',
    label: 'Cost of Living',
    lowLabel: 'Cheap',
    highLabel: 'Expensive',
    emoji: '💵',
  },
  {
    key: 'paceOfLife',
    label: 'Pace of Life',
    lowLabel: 'Calm',
    highLabel: 'Fast',
    emoji: '⏱️',
  },
  {
    key: 'pollution',
    label: 'Pollution',
    lowLabel: 'Clean',
    highLabel: 'Polluted',
    emoji: '🌱',
  },
  {
    key: 'infrastructure',
    label: 'Infrastructure',
    lowLabel: 'Limited',
    highLabel: 'Excellent',
    emoji: '🏥',
  },
  {
    key: 'socialLife',
    label: 'Social Life',
    lowLabel: 'Isolated',
    highLabel: 'Social',
    emoji: '👥',
  },
]

function getScoreColor(score: number, paramKey: keyof OutcomeFactors['scores']): string {
  // For cost, pollution, and pace: lower is better (green), higher is worse (red)
  // For infrastructure and social: higher is better (green), lower is worse (red)
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

function getScoreLabel(score: number, paramKey: keyof OutcomeFactors['scores']): string {
  const reverseScale = paramKey === 'infrastructure' || paramKey === 'socialLife'
  
  if (reverseScale) {
    if (score >= 4) return 'High'
    if (score === 3) return 'Medium'
    return 'Low'
  } else {
    if (score <= 2) return 'Low'
    if (score === 3) return 'Medium'
    return 'High'
  }
}

export default function OutcomeVisualization({ outcome, hasSelections }: OutcomeVisualizationProps) {
  const [showDetails, setShowDetails] = useState(false)

  if (!hasSelections) {
    return (
      <div className="bg-white rounded-lg border-2 border-gray-200 p-8 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">{outcome.title}</h2>
          <p className="text-gray-600">{outcome.description}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-900 mb-1">{outcome.title}</h2>
        <p className="text-gray-600">{outcome.description}</p>
      </div>

      {/* Score Bars */}
      <div className="p-6 space-y-5">
        {parameters.map((param) => {
          const score = outcome.scores[param.key]
          const percentage = (score / 5) * 100
          const color = getScoreColor(score, param.key)
          const label = getScoreLabel(score, param.key)

          return (
            <div key={param.key} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{param.emoji}</span>
                  <span className="font-medium text-gray-900">{param.label}</span>
                </div>
                <span className="text-sm font-semibold text-gray-700">{label}</span>
              </div>
              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden relative">
                <div
                  className={`h-full ${color} rounded-full transition-all duration-500 ease-out`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500 px-1">
                <span>{param.lowLabel}</span>
                <span>{param.highLabel}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Optional Details Section */}
      {outcome.considerations.length > 0 && (
        <div className="border-t border-gray-100">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
          >
            <span className="font-medium text-gray-700">Details</span>
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${showDetails ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {showDetails && (
            <div className="px-4 pb-4 space-y-2">
              {outcome.considerations.map((consideration, index) => (
                <div key={index} className="text-sm text-gray-600 p-3 bg-gray-50 rounded-lg">
                  {consideration}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
