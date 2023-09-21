"use client";
import Button from "@/Utility_Component/Button";
import { collection, getCountFromServer, getDocs, query, where } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/firebase";
import { redirect } from 'next/navigation'


export default function NameProfileInfo() {

  const { data: session, status } = useSession();
  if(!session)
  {
    redirect("/");
  }
  const [postData, setPostData] = useState(0);
  const [postNumber, setPostNumber] = useState(0);

  
  // retrive length of posts according to session email
  useEffect(() => {
    if (session) {
      // Create a query to get the posts where UserEmail matches the user's email
      const q = query(collection(db, 'Posts'), where('UserEmail', '==', session.user?.email));

      // Get the documents that match the query
      const fetchPostCount = async () => {
        const querySnapshot = await getDocs(q);
        // const count = querySnapshot.size; // Get the number of documents
        // console.log(count)
        // setPostCount(count);

        setPostData(querySnapshot)
      };

      fetchPostCount();
    }
  }, [session]);

  useEffect(() => {
    setPostNumber(postData.size);

    }
  , [postData]);





  return (
    <>
    {session ? (
        <div className="px-16">
        <div className="p-8 bg-[#2a303a] shadow mt-24 rounded-lg">
  
          <div className="grid grid-cols-1 md:grid-cols-3">
            
            <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
       
              <div>
          
                <p className="font-bold text-gray-300 text-xl">
                  {/* print length of user post */}
                  {postNumber}
                </p>
                <p className="text-gray-100">Posts</p>
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
            <div className="relative">
         
              <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
              <img className=" rounded-full" src={session.user?.image} alt="James Bhatta" />
           
              </div>
            </div>
           
          </div>
          <div className="mt-20 text-center border-b pb-12">
            
            <h1 className="text-4xl font-medium text-white">
              {session.user?.name}
            </h1>
            <p className="font-light text-white mt-3">{session.user?.email}</p>
    
            <p className="mt-2 flex items-center justify-center">
              <p>
            <span className="text-sm tracking-wide flex items-center space-x-1">
                  <svg className="h-4 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg><span className="text-green-400">Verified</span>
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
