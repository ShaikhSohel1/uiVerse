"use client"
import PostCard from '@/Utility_Component/PostCard'
import React, { useEffect, useState } from 'react'
import { addDoc, collection, doc, getDocs, serverTimestamp, setDoc } from "firebase/firestore"; 
import {db} from '../../firebase/firebase'
import { useSession } from 'next-auth/react';

export default function Community() {
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
          (item) => (item.Element_Type != "Cards" && item.Element_Type != "Forms" )
        );
        setFilteredPost(filteredData);
    }, [post]);


  return (
    <div class="text-center p-10">
    <h1 class="text-4xl px-10 font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-cyan-400">Magical Elements</h1>
    <div className='grid grid-cols-1 mt-10 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
    {filteredPost.map((element) => (
      <PostCard 
      key={element.id}
      element = {element}
      />
    ))}
    </div>
</div>
  )
}
