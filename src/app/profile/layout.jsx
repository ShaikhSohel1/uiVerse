import AuthProvider from '@/Components/AuthProvider'
import ProfileInfo from '@/Components/ProfileComponents/ProfileInfo'
import React from 'react'

export default function layout({children}) {
  return (
    <div>
        <AuthProvider>
          {children}
        </AuthProvider>
    </div>
  )
}
