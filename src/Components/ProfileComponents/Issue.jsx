import IssueCard from '@/Utility_Component/IssueCard'
import React from 'react'

export default function Issue() {
  return (
    <div>
      <p className='mt-6 font-semibold text-white flex items-center justify-center text-5xl'>Issues</p>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 px-9 mt-4'>
      <IssueCard />
      <IssueCard />
      <IssueCard />

      </div>
    </div>
  )
}
