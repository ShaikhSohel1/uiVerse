import ContributionCard from '@/Utility_Component/ContributionCard'
import React from 'react'

export default function Contributers() {
  return (
    <div class="text-center p-10">
    <h1 class="font-bold text-4xl mb-4 text-white cursor-default">Top Contributors</h1>
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
