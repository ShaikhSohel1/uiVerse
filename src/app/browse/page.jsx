"use client"
import Browse from '@/Components/Browse'
import CustomEditor from '@/Components/Editor'
import SideBar from '@/Components/SideBar'
import React, { useState } from 'react'

export default function page() {
  const [SearchElement, setSearchElement] = useState("All")
  console.log(SearchElement) 
  return (
  <div className='grid grid-cols-1 lg:grid-cols-7 h-full'>
    <div className='w-full'>
    <SideBar setSearchElement={setSearchElement}/>
    </div>
    <div className='col-span-6'>
    <Browse element={SearchElement} setSearchElement={setSearchElement}/>
    </div>


  </div>
  )
}
