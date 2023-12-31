import AuthProvider from '@/Components/AuthProvider'
import Issue from '@/Components/ProfileComponents/Issue'
import ProfileInfo from '@/Components/ProfileComponents/ProfileInfo'
import UserActivity from '@/Components/ProfileComponents/UserActivity'
import UserPostSection from '@/Components/ProfileComponents/UserPostSection'
import { useSession } from 'next-auth/react'
import React from 'react'

export default function page() {
  return (
    <div className='flex flex-col'>

      <ProfileInfo />
      <UserActivity />
    <Issue />
    <UserPostSection />
 
    </div>
  )
}
