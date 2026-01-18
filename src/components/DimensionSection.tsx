'use client'

import { useState } from 'react'
import { LocationOption, FamilyContextOption, LifestyleOption } from '@/types'

type DimensionOption = LocationOption | FamilyContextOption | LifestyleOption

interface DimensionSectionProps {
  title: string
  selectedValue: string | null
  options: DimensionOption[]
  selectedOption: DimensionOption | null
  onSelect: (option: DimensionOption) => void
  color: 'teal' | 'pink' | 'purple'
  icon: React.ReactNode
}

const colorClasses = {
  teal: {
    border: 'border-teal-200',
    bg: 'bg-teal-50',
    text: 'text-teal-700',
    icon: 'bg-teal-500',
    selectedBorder: 'border-teal-500',
    selectedBg: 'bg-teal-50',
  },
  pink: {
    border: 'border-pink-200',
    bg: 'bg-pink-50',
    text: 'text-pink-700',
    icon: 'bg-pink-500',
    selectedBorder: 'border-pink-500',
    selectedBg: 'bg-pink-50',
  },
  purple: {
    border: 'border-purple-200',
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    icon: 'bg-purple-500',
    selectedBorder: 'border-purple-500',
    selectedBg: 'bg-purple-50',
  },
}

export default function DimensionSection({
  title,
  selectedValue,
  options,
  selectedOption,
  onSelect,
  color,
  icon,
}: DimensionSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const colors = colorClasses[color]

  return (
    <div className={`rounded-lg border-2 ${colors.border} bg-white shadow-sm transition-all`}>
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center gap-3 text-left hover:bg-gray-50 transition-colors rounded-t-lg"
      >
        <div className={`w-8 h-8 rounded-full ${colors.icon} flex items-center justify-center flex-shrink-0`}>
          {selectedOption ? (
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            icon
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          {selectedValue && (
            <p className={`text-sm mt-1 ${colors.text}`}>{selectedValue}</p>
          )}
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Options Grid */}
      {isExpanded && (
        <div className="p-4 pt-0 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
            {options.map((option) => {
              const isSelected = selectedOption?.id === option.id
              return (
                <button
                  key={option.id}
                  onClick={() => {
                    onSelect(option)
                    setIsExpanded(false)
                  }}
                  className={`p-4 rounded-lg border-2 text-left transition-all hover:shadow-md ${
                    isSelected
                      ? `${colors.selectedBorder} ${colors.selectedBg}`
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{option.title}</h4>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </div>
                    {isSelected && (
                      <div className={`ml-2 flex-shrink-0 ${colors.text}`}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

