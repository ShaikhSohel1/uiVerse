"use client"
import ContributionCard from '@/Utility_Component/ContributionCard'
import React, { useEffect, useState } from 'react'
import {collection, limit, onSnapshot, orderBy, query } from "firebase/firestore"; 
import {db} from '../../firebase/firebase'

export default function Contributers() {
  const [getContributers, setgetContributers] = useState([])
  const [TopContributers, setTopContributers] = useState([])
  let i = 1;

  const getTopContributers = () => {
    const ContributeCollectionRef = query(collection(db, "Users"), orderBy("NoOfPosts", "desc"),limit(10));
  
    // Set up a real-time listener
    const unsubscribe = onSnapshot(ContributeCollectionRef, (querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
  
      setgetContributers(newData);
      console.log(newData)
//  setLoading(false)
  
    });
  
    // Clean up the listener when the component unmounts
    return unsubscribe;
  };
  
  useEffect(() => {
    // Start the listener only once when the component mounts
    const unsubscribe = getTopContributers();
  
    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []); 

  useEffect(() => {
    setTopContributers(getContributers);
}, [getContributers]);

  return (
    <div className="text-center p-10">
    <h1 className="text-4xl px-10 font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-cyan-400 ">Top Contributors</h1>
    <div className='grid grid-cols-2 mt-10 gap-6 md:grid-cols-3 lg:grid-cols-4 lg:px-24'>
      {TopContributers.map(doc => (
        <ContributionCard TopContributers={doc} i={i++} key={doc}/>
      ))}
    


    </div>
</div>
  )
}
