"use client"
import React, { useState } from 'react'
import IssueViewModel from './IssueViewModel'
import PostCard from './PostCard'


export default function IssueCard() {
  const [open, setOpen] = useState(false)

  
  return (
    <div className='flex flex-col bg-[#2a303a] rounded-lg sm:flex-row p-5'>
     
<div class="w-full max-w-sm border-none flex items-center justify-center">
    <div class="flex justify-end px-4 pt-4">
  
    </div>
    <div class="flex flex-col items-center pb-10 justify-center" >
        <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src="https://avatars.githubusercontent.com/u/87869024?v=4" alt="Bonnie image"/>
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Bonnie Green</h5>
        <span class="text-sm text-gray-400">Visual Designer</span>
        <div class="flex mt-4 space-x-3 md:mt-6">
            <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add friend</a>
            <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Message</a>
        </div>
    </div>
</div>
<div class="w-full h-full flex flex-col items-center  p-10   ">
  
 {/* description AND  button for view  */}
  <div className='flex flex-col space-y-28'>
    <div>
    <p className='text-white text-lg font-semibold'>Description</p>
  <p className='text-white text-sm font-medium'>Hello there!!</p>
    </div>

    <button className="font-bold text-xl mb-4 text-white cursor-default flex gap-3 items-center bg-[#1e1e1e] hover:bg-neutral-900 px-6 py-3 rounded-lg mt-6 mx-10"
   onClick={() => setOpen(true)}
   >Save</button> 
  </div>

</div>
{open ? (
  <IssueViewModel open={open} setOpen={setOpen} />
 ) : null}

    </div>


  )
}
