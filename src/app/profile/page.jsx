import AuthProvider from '@/Components/AuthProvider'
import Issue from '@/Components/ProfileComponents/Issue'
import ProfileInfo from '@/Components/ProfileComponents/ProfileInfo'
import UserPostSection from '@/Components/ProfileComponents/UserPostSection'
import React from 'react'

export default function page() {
  return (
    <div>
    <div className='grid grid-cols-1 md:grid-cols-2 bg-slate-700'>
      <ProfileInfo />
      <Issue />
    </div>
    <UserPostSection />
    </div>
  )
}
