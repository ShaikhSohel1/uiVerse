"use client";
import Button from "@/Utility_Component/Button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

export default function ProfileInfo() {
  const { data: session, status } = useSession();

  return (
    <>
    {session ? (
        <div class="px-16">
        <div class="p-8 bg-[#2a303a] shadow mt-24 rounded-lg">
  
          <div class="grid grid-cols-1 md:grid-cols-3">
            
            <div class="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
       
              <div>
          
                <p class="font-bold text-gray-300 text-xl">22</p>
                <p class="text-gray-100">Posts</p>
              </div>
              {/* <div>
                {" "}
                <p class="font-bold text-gray-700 text-xl">10</p>{" "}
                <p class="text-gray-400">Photos</p>{" "}
              </div>{" "}
              <div>
                {" "}
                <p class="font-bold text-gray-700 text-xl">89</p>{" "}
                <p class="text-gray-400">Comments</p>{" "}
              </div>{" "} */}
            </div>
            <div class="relative">
         
              <div class="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
              <img class=" rounded-full" src={session.user?.image} alt="James Bhatta" />
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-24 w-24"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
        
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  />
                </svg> */}
              </div>
            </div>
           
          </div>
          <div class="mt-20 text-center border-b pb-12">
            
            <h1 class="text-4xl font-medium text-white">
              {session.user?.name}
            </h1>
            <p class="font-light text-white mt-3">{session.user?.email}</p>
    
            <p class="mt-2 flex items-center justify-center">
              <p>
            <span class="text-sm tracking-wide flex items-center space-x-1">
                  <svg class="h-4 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg><span class="text-green-400">Verified</span>
                </span></p>
            </p>
          </div>
   
        </div>
      </div>
    ) : (
      <Button />
    )}
  
    </>
  );
}
