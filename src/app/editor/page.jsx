"use client"
import CustomEditor from '@/Components/Editor';
import SideBar from '@/Components/SideBar';
import Button from '@/Utility_Component/Button';
import DropDownButton from '@/Utility_Component/DropDownButton';
import { signIn, useSession } from 'next-auth/react';
import React from 'react'
import elements from '@/Utility_Component/ElementData';
import {AiOutlineArrowLeft} from 'react-icons/ai'

export default function page() {
    const {data: session, status}= useSession();
  return (

    <div>
 {session ? ( 
    <>
     <div className='grid grid-cols-1 lg:grid-cols-7 h-full'>
     <div className='w-full'>
     <SideBar />
     </div>
     <div className='col-span-6'>
     <div className='flex justify-between px-5'>
    <h1 className="font-bold text-xl mb-4 text-white cursor-default flex gap-3 items-center hover:bg-slate-600 px-6 py-3 rounded-lg"><AiOutlineArrowLeft /> Go Back</h1>
    <DropDownButton elements={elements} />
      </div>
     <CustomEditor />
     </div>
     </div>
     </>
    ) : signIn()}
    </div>
   
  )
}
