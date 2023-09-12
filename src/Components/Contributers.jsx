import ContributionCard from '@/Utility_Component/ContributionCard'
import React from 'react'

export default function Contributers() {
  return (
    <div class="text-center p-10">
    <h1 class="text-4xl px-10 font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-cyan-400 ">Top Contributors</h1>
    <div className='grid grid-cols-2 mt-10 gap-6 md:grid-cols-3 lg:grid-cols-4 lg:px-24'>
    <ContributionCard />
    <ContributionCard />
    <ContributionCard />
    <ContributionCard />
    <ContributionCard />
    <ContributionCard />
    <ContributionCard />
    <ContributionCard />

    </div>
</div>
  )
}
