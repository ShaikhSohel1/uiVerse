"use client"
import PostCard from '@/Utility_Component/PostCard'
import React, { useEffect, useState } from 'react'
import { addDoc, collection, doc, getDocs, serverTimestamp, setDoc } from "firebase/firestore"; 
import {db} from '../../firebase/firebase'
import { useSession } from 'next-auth/react';

export default function Community() {
  const [post, setpost] = useState([]);
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


  return (
    <div class="text-center p-10">
    <h1 class="font-bold text-4xl mb-4 text-white cursor-default">Community</h1>
    <div className='grid grid-cols-1 mt-10 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
    {post.map((element) => (
      <PostCard 
      element = {element}
      />
    ))}
    </div>
</div>
  )
}
