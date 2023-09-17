"use client"
import React from 'react'
import Browse from '@/Components/Browse'
import SideBar from '@/Components/SideBar'


const page = ({params}) => {

const  id = params.id


  return (
    <div className='grid grid-cols-1 lg:grid-cols-7 h-full'>
    <div className='w-full'>
    <SideBar />
    </div>
    <div className='col-span-6'>
    <Browse   element={id} />
    </div>


  </div>
  )
}

export default page