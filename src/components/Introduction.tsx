'use client'

import { ArrowRight, Sparkles, MapPin, Users, Heart } from 'lucide-react'
import Image from 'next/image'
import { generateCombinations } from '@/data/combinations'
import CombinationCard from './CombinationCard'

interface IntroductionProps {
  onStart: () => void
}

export function Introduction({ onStart }: IntroductionProps) {
  const combinations = generateCombinations()

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-teal-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-teal-200 shadow-sm">
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span className="text-sm text-stone-700">Interactive Exploration Tool</span>
              </div> */}
              
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl text-stone-900 tracking-tight leading-tight">
                  How does life after{' '}
                  <span className="bg-gradient-to-r from-teal-600 to-rose-600 bg-clip-text text-transparent">
                    early retirement
                  </span>{' '}
                  look?
                </h1>
                
                <p className="text-xl text-stone-600 leading-relaxed max-w-xl">
                  Explore how your choices about 
                  location, family, and lifestyle shape your post-work future.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onStart}
                  className="group flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg shadow-teal-200 hover:shadow-xl hover:shadow-teal-300 hover:scale-105"
                >
                  Start Exploring
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                {/* <button
                  onClick={onStart}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-white/80 backdrop-blur-sm text-stone-700 rounded-full hover:bg-white transition-all border-2 border-stone-200 hover:border-stone-300"
                >
                  See How It Works
                </button> */}
              </div>

              <p className="text-sm text-stone-500 leading-relaxed">
                No financial calculations. No investment advice. 
              </p>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-teal-200 to-rose-200 rounded-full blur-3xl opacity-30" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1758545854734-713dd59d43f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Early retirement lifestyle"
                  width={1080}
                  height={600}
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-stone-900 mb-3">Three Dimensions of Your Future</h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Combine different choices to visualize countless possibilities for your early retirement
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-100 to-teal-50 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-white/70 backdrop-blur-sm p-8 rounded-2xl border-2 border-teal-100 hover:border-teal-300 transition-all shadow-sm hover:shadow-lg">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-500 flex items-center justify-center mb-6 shadow-lg">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-stone-900 mb-3">Where You'll Live</h3>
              <p className="text-stone-600 leading-relaxed mb-4">
                From coastal towns to mountain villages, overseas adventures to suburban comfort. 
                Your location shapes everything.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs">Coastal Town</span>
                <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs">Mountains</span>
                <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs">Overseas</span>
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-orange-50 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-white/70 backdrop-blur-sm p-8 rounded-2xl border-2 border-rose-100 hover:border-rose-300 transition-all shadow-sm hover:shadow-lg">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-400 to-orange-400 flex items-center justify-center mb-6 shadow-lg">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-stone-900 mb-3">Who You're With</h3>
              <p className="text-stone-600 leading-relaxed mb-4">
                Solo living, partnership, family with kids, or community. Your social context 
                defines your daily experience.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-rose-50 text-rose-700 rounded-full text-xs">Solo</span>
                <span className="px-3 py-1 bg-rose-50 text-rose-700 rounded-full text-xs">Partner</span>
                <span className="px-3 py-1 bg-rose-50 text-rose-700 rounded-full text-xs">Family</span>
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-50 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-white/70 backdrop-blur-sm p-8 rounded-2xl border-2 border-purple-100 hover:border-purple-300 transition-all shadow-sm hover:shadow-lg">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center mb-6 shadow-lg">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-stone-900 mb-3">How You'll Spend Time</h3>
              <p className="text-stone-600 leading-relaxed mb-4">
                Simple and quiet, travel-oriented, creative pursuits, or purpose-driven. 
                Your lifestyle defines your fulfillment.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs">Travel</span>
                <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs">Creative</span>
                <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pre-configured Combination Cards Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-stone-900">What are the options?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {combinations.map((combination) => (
            <CombinationCard key={combination.id} combination={combination} />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-20">
        <div className="bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-sm rounded-3xl p-10 md:p-12 border-2 border-white/50 shadow-xl text-center">
          <h2 className="text-3xl font-semibold text-stone-900 mb-4">Ready to Visualize Your Future?</h2>
          <p className="text-lg text-stone-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Select your preferences across three dimensions and discover what your 
            early retirement could actually look like—complete with daily rhythms, 
            key considerations, and personalized insights.
          </p>
          <button
            onClick={onStart}
            className="group inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full hover:from-teal-600 hover:to-teal-700 transition-all shadow-xl shadow-teal-200 hover:shadow-2xl hover:shadow-teal-300 hover:scale-105"
          >
            Begin Your Exploration
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Footer Note */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <p className="text-center text-xs text-stone-500 leading-relaxed">
          This is an informational tool for exploration and understanding. 
          It does not provide financial advice, investment recommendations, or guarantees about retirement outcomes.
        </p>
      </div>
    </div>
  )
}

