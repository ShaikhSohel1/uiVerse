"use client"
import PostCard from '@/Utility_Component/PostCard'
import React, { useEffect, useState } from 'react'
import { addDoc, collection, doc, getDocs, serverTimestamp, setDoc } from "firebase/firestore"; 
import { useSession } from 'next-auth/react';
import {db} from '../../../firebase/firebase'

export default function UserPostSection() {
  const {data: session, status}= useSession();

  const [post, setpost] = useState([]);
  const [filteredPost, setFilteredPost] = useState([]);
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
  
        const filteredData = post.filter(
          (item) => (item.UserEmail == session?.user?.email)
        );
        setFilteredPost(filteredData);
    }, [post,session?.user?.email]);

  return (
    <div className="text-center p-10 mt-6">
      <h1 className="font-bold text-4xl mb-4 text-white cursor-default ">My Posts</h1>

<div className='text-2xl px-10 font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-cyan-400 mt-10'>All</div>
      <div className="grid grid-cols-1 mt-10 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            

        {filteredPost.map((element) => {
        
          if(element.Element_Type != "Cards" && element.Element_Type != "Forms")
          return <PostCard key={element.id} element={element} />
            })}
      </div>

      <div className='text-2xl px-10 font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-cyan-400 mt-10'>Cards</div>
      <div className="grid grid-cols-1 mt-10 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      

      
      {filteredPost.map((element) => {
        
        if(element.Element_Type == "Cards")
        return <PostCard key={element.id} element={element} />
          })}
    </div>

    <div className='text-2xl px-10 font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-cyan-400 mt-10'>Forms</div>

      <div className="grid grid-cols-1 mt-10 gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      

       
      {filteredPost.map((element) => {
        
        if( element.Element_Type == "Forms")
        return <PostCard key={element.id} element={element} />
          })}
      </div>
    </div>
  );
}
