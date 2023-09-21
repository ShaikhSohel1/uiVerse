"use client"
import DropDownButton from '@/Utility_Component/DropDownButton'
import PostCard from '@/Utility_Component/PostCard'
import React, { useEffect, useState } from 'react'
import elements from '@/Utility_Component/ElementData'
import { addDoc, collection, doc, getDocs, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore"; 
import {db} from '../../firebase/firebase'
import { useRouter } from 'next/navigation'
import SkeletonLoader from '@/Utility_Component/SkeletonLoader'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function Browse({element}) {
  const router = useRouter();
  const [post, setpost] = useState([]);
  const [filteredPost, setFilteredPost] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = element=="Forms" ? 6 : 9;
  const [loading, setLoading] = useState(true);
  // const [dropDownElement, setdropDownElement] = useState("All")

  const ElementList = [1,2,3,4,5,6,7,8,9];

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    console.log(currentPage)
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      console.log(currentPage)
    }
  };


  const getPosts = () => {
    const PostCollectionRef = collection(db, "Posts");
  
    // Set up a real-time listener
    const unsubscribe1 = onSnapshot(PostCollectionRef, (querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
  
      setpost(newData);
      console.log(newData)
 setLoading(false)
  
    });
  
    // Clean up the listener when the component unmounts
    return unsubscribe1;
  };

  useEffect(() => {
        // Start the listener only once when the component mounts
        const unsubscribe = getPosts();
  
        // Clean up the listener when the component unmounts
        return () => {
          unsubscribe();
        };
  }, []);
  

  // filter data according to side bar selection
  useEffect(() => {
    let startIndex = (currentPage -1) * cardsPerPage;
    let endIndex = startIndex + cardsPerPage;

    if (element === 'All') {
      const filteredData = post.filter(
        (item) => (item.Element_Type != "Cards" && item.Element_Type != "Forms" )
      );
      setFilteredPost(filteredData.slice(startIndex, endIndex));
    } else  {
      const filteredData = post.filter(
        (item) => item.Element_Type === element
      );
      setFilteredPost(filteredData.slice(startIndex, endIndex));
    }
  }, [element, post, currentPage]);



  return (
    <div class="text-center p-10  min-h-screen">
      <div className='flex justify-between'>
    <h1 class="font-bold text-4xl mb-4 text-white cursor-default">{element}</h1>
    <DropDownButton elements={elements} />
      </div>
    <div
    //  className='grid grid-cols-1 mt-10 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'
    className={classNames(element == "Forms"? ' md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2':' md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3','grid grid-cols-1 mt-10 gap-6')}
    >
      {
        loading? (
          <>
          {ElementList.map(i => (
              <SkeletonLoader element={element} key={i}/>
          ))}
        </>
        ):(
          <>
          {filteredPost.map((element) => (
            <PostCard element={element} key={element.id} /> // Add a unique key prop
          ))}
             </>
        )
      }
   

    </div>

    
    <div className='flex justify-between mt-5'>
      <divName
      onClick={handlePreviousPage}
      disabled={currentPage === 1}
      className={classNames(currentPage === 1 ? 'invisible':'')}
      >
      <a href="#_" class="relative inline-flex items-center justify-start py-3 pl-12 pr-4 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-6 hover:pr-10 bg-gray-50 group">
  <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"></span>
 
  <span className="absolute left-0 pl-4 duration-200 ease-out group-hover:translate-x-32">
    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
    </svg>
  </span>
  <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">Button Previou</span>
</a>   
      </divName>



      <div
      onClick={handleNextPage}
      disabled={filteredPost.length < cardsPerPage}
      className={classNames(filteredPost.length < cardsPerPage ? 'invisible':'')}
      >
      <a href="#_" className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group">
<span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"></span>
<span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
<svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
</span>
<span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
<svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
</span>
<span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">Button Next</span>
</a>
      </div>
    </div>
</div>
  )
}
