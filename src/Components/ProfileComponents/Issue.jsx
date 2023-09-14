"use client"

import IssueCard from '@/Utility_Component/IssueCard'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore"; 
import {db} from '../../../firebase/firebase'


export default function Issue() {

  const {data: session, status}= useSession();

// craete issue functionality from contribution db
  const [issueData, setIssueData] = useState('')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getIssueData = () => {
    if(session)
    {
      const ContributionCollectionRef = query(collection(db, "Contributions"), where("OwnerEmail", "==", session.user?.email));
      const unsubscribe = onSnapshot(ContributionCollectionRef, (querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
         setIssueData(newData);
          console.log(newData);
        }
      );

      return unsubscribe;
    }
    // const ContributionCollectionRef = collection(db, "Contributions");


 
  };
  
  useEffect(() => {
const unsubscribe = getIssueData();

return () => {
  unsubscribe();
};
  }, []);




  return (
    <div>
      {issueData &&  <p className='mt-6 font-semibold text-white flex items-center justify-center text-5xl'>Issues</p>}
     
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 px-9 mt-4'>
      {/* <IssueCard />
      <IssueCard />
      <IssueCard /> */}
      {
        issueData && issueData.map((issue) => (
          <IssueCard
          key={issue.id}
          issue={issue}
          />
        ))
      }
      </div>
    </div>
  )
}
