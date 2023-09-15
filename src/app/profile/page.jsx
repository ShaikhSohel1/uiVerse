import AuthProvider from '@/Components/AuthProvider'
import Issue from '@/Components/ProfileComponents/Issue'
import ProfileInfo from '@/Components/ProfileComponents/ProfileInfo'
import UserPostSection from '@/Components/ProfileComponents/UserPostSection'
import { useSession } from 'next-auth/react'
import React from 'react'

export default function page() {
  return (
    <div className='flex flex-col'>

      <ProfileInfo />
    <Issue />
    <UserPostSection />
 
    </div>
  )
}
