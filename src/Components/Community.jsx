"use client"
import PostCard from '@/Utility_Component/PostCard'
import React, { useEffect, useState } from 'react'
import { addDoc, and, collection, doc, getDocs, limit, onSnapshot, query, serverTimestamp, setDoc, where } from "firebase/firestore"; 
import {db} from '../../firebase/firebase'
import { useSession } from 'next-auth/react';
import SkeletonLoader from '@/Utility_Component/SkeletonLoader';

export default function Community() {
  const {data: session, status}= useSession();
  const [post, setpost] = useState([]);
  const [filteredPost, setFilteredPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingobj = [1,2,3,4,5,6,7,8,9,10,11,12]


  // const getPosts = async () => {
  //   try {
  //     const querySnapshot = await getDocs(collection(db, 'Posts'));
  //     const newData = querySnapshot.docs.map((doc) => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     }));
  //     setpost(newData);
  //     setLoading(false); // Set loading to false when data is fetched
  //   } catch (error) {
  //     console.error('Error fetching posts:', error);
  //     setLoading(false); // Handle errors and set loading to false
  //   }
  // };

  // useEffect(() => {
  //   getPosts();
  // }, [db]);
  const getPosts = () => {
 
    const PostCollectionRef =  query(collection(db, "Posts"),where('Element_Type', 'not-in', ['Cards', 'Forms']),limit(12));
  
    // Set up a real-time listener
    const unsubscribe = onSnapshot(PostCollectionRef, (querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
  
      setpost(newData);
      console.log(newData)
 setLoading(false)
  
    });
  
    // Clean up the listener when the component unmounts
    return unsubscribe;
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
  
        // const filteredData = post.filter(
        //   (item) => (item.Element_Type != "Cards" && item.Element_Type != "Forms" )
        // );
        setFilteredPost(post);
    }, [post]);


  return (
    <div className="text-center p-10 ">
    <h1 className="text-4xl px-10 font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-cyan-400 py-1">Magical Elements</h1>
    <div className='grid grid-cols-1 mt-10 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
    {/* {filteredPost.map((element) => (
      <PostCard 
      key={element.id}
      element = {element}
      />
    ))} */}





{loading ? (
  <>
  {loadingobj.map(i => (
      <SkeletonLoader element="All" key={i}/>
  ))}

  </>

        ) : (
          // Render actual PostCard components once data is loaded
          filteredPost.map((element) => (
            <PostCard key={element.id} element={element} />
          ))
        )}
    </div>
</div>
  )
}
