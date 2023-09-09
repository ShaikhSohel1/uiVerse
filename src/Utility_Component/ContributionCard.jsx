import React from 'react'

export default function ContributionCard() {
  return (
    <div className="w-full max-w-sm bg-transparent hover:bg-[#1C2128] rounded-lg shadow transition delay-100 ease-in-out cursor-pointer">
    <div className="flex justify-end px-4 pt-4">
    </div>
    <div className="flex flex-col items-center">
        <img className="w-10 h-10  mb-3 rounded-full shadow-lg" src="https://avatars.githubusercontent.com/u/87869024?v=4" alt="Bonnie image"/>
        <h5 className="mb-1 text-xl font-medium  text-white"><span>#1</span> Bonnie Green</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span>
    </div>
</div>
  )
}
