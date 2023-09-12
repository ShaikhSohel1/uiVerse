import React from 'react'
import '../Style/Button.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Button() {
  const router = useRouter();
  return (
    // <Link 
    // href="/editor"
    // >
    <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 hover:text-white dark:text-white
    focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
    onClick={() => router.replace('/editor')}
    >
    <span class="relative px-5 py-2.5 transition-all ease-in duration-75  bg-[#22272E] rounded-md group-hover:bg-opacity-40">
        Create
    </span>
  </button>
  // </Link>
  )
}
