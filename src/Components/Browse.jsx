"use client"
import DropDownButton from '@/Utility_Component/DropDownButton'
import PostCard from '@/Utility_Component/PostCard'
import React, { useEffect, useState } from 'react'
import elements from '@/Utility_Component/ElementData'
import { addDoc, collection, doc, getDocs, serverTimestamp, setDoc } from "firebase/firestore"; 
import {db} from '../../firebase/firebase'

export default function Browse({element, setSearchElement}) {
  console.log(element)
  const [post, setpost] = useState([]);
  const [filteredPost, setFilteredPost] = useState([]);
  // const [dropDownElement, setdropDownElement] = useState("All")



  const getPosts = async () => {
    const docRef = await getDocs(collection(db, "Posts")).then(
      (querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
       setpost(newData)
        console.log(newData);
      }
    );
  };

  useEffect(() => {
    getPosts();
  }, []);

  // filter data according to side bar selection
  useEffect(() => {
    if(element == "All")
    {
      setFilteredPost(post)
    }
    else{
      const filteredData = post.filter((item) => item.Element_Type === element);
      setFilteredPost(filteredData); // Update the filtered data state
    }
    
  }, [element, post]); // Include 'post' as a dependency

  return (
    <div class="text-center p-10">
      <div className='flex justify-between'>
    <h1 class="font-bold text-4xl mb-4 text-white cursor-default">{element}</h1>
    <DropDownButton elements={elements} setSearchElement={setSearchElement}/>
      </div>
    <div className='grid grid-cols-1 mt-10 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'>
    {filteredPost.map((element) => (
          <PostCard element={element} key={element.id} /> // Add a unique key prop
        ))}
    </div>

    
    <div className='flex justify-between mt-5'>
      <div>
      <a href="#_" class="relative inline-flex items-center justify-start py-3 pl-12 pr-4 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-6 hover:pr-10 bg-gray-50 group">
  <span class="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"></span>
 
  <span class="absolute left-0 pl-4 duration-200 ease-out group-hover:translate-x-32">
    <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
    </svg>
  </span>
  <span class="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">Button Previous</span>
</a>

      </div>
      <div>
      <a href="#_" class="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group">
<span class="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"></span>
<span class="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
<svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
</span>
<span class="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
<svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
</span>
<span class="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">Button Next</span>
</a>
      </div>
    </div>
</div>
  )
}
