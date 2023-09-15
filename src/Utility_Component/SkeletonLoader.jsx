import React from 'react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
export default function SkeletonLoader({element}) {
  return (
    <div class=" p-2 rounded-2xl flex flex-col gap-5 select-none justify-center">
    <div
    className={classNames(element == "Cards" ? 'min-h-[25rem] max-h-[50rem]' : element == "Forms" ? 'min-h-[45rem] max-h-[50rem]' : 'min-h-[17rem] max-h-[17rem]', 'rounded-lg shadow-xl bg-gray-200 animate-pulse')}
    ></div></div>
  )
}
