import Browse from '@/Components/Browse'
import CustomEditor from '@/Components/Editor'
import SideBar from '@/Components/SideBar'
import React from 'react'

export default function page() {
  return (
  <div className='grid grid-cols-1 lg:grid-cols-7 h-full'>
    <div className='w-full'>
    <SideBar />
    </div>
    <div className='col-span-6'>
    <Browse />
    </div>


  </div>
  )
}
