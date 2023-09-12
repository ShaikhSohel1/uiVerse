"use client"
import React, { useEffect, useState } from 'react'
import '../Style/PostCard.css'
import Link from 'next/link';
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai'
import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { useSession } from 'next-auth/react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { onSnapshot } from 'firebase/firestore';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function PostCard({element}) {
  const {data: session, status}= useSession();
  const [htmlCode, setHtmlCode] = useState(element.HtmlCode);
  const [cssCode, setCssCode] = useState(element.CssCode);
  const [previewCode, setPreviewCode] = useState('');
  const [likes, setlikes] = useState(false);
  const [getLikes, setgetLikes] = useState([]);
  const [getLikeNumber, setgetLikeNumber] = useState(null);

  const active = element.Element_Type == 'Cards';
  const activefroms = element.Element_Type == 'Forms';
  useEffect(() => {
    // Combine HTML and CSS for live preview
  setPreviewCode(`
      <style>
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
        ${cssCode}
      </style>
      ${htmlCode}`);
  }, [htmlCode, cssCode]);

  const getLikePost = () => {
    const likesCollectionRef = collection(db, "Posts", element.id, "Likes");
  
    // Set up a real-time listener
    const unsubscribe = onSnapshot(likesCollectionRef, (querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setgetLikes(newData);
      setgetLikeNumber(newData.length);
  
      // Check if the current user has liked the post
      if (
        newData.findIndex((like) => like.UserName === session.user.email) !== -1
      ) {
        setlikes(true);
      } else {
        setlikes(false);
      }
    });
  
    // Clean up the listener when the component unmounts
    return unsubscribe;
  };
  
  useEffect(() => {
    const unsubscribe = getLikePost();
  
    return () => {
      // Unsubscribe from the listener when the component unmounts
      unsubscribe();
    };
  }, []);

useEffect(() => {
  setgetLikeNumber(getLikes.length);
}, [getLikes]);

const LikePost = async () => {
  await setDoc(doc(db, "Posts", element.id, "Likes", session.user.email), {
    UserName: session.user.email,
  });
  setlikes(true);

};
const deletePost = async () => {
  await deleteDoc(
    doc(db, "Posts", element.id, "Likes", session.user.email)
  );
  setlikes(false);
};

  return (
  <div>
<div class="w-full rounded-lg shadow bg-[#2a303a] group/item "
>
<Link
href={{
  pathname: '/editor',
  query: { id: element.id },
}}
>
<iframe
    title="Live Preview"
    srcDoc={previewCode}
    width="100%"
    height="100%"
    className={classNames(active || activefroms  ? 'min-h-[25rem] max-h-[50rem]' : 'min-h-[17rem] max-h-[17rem]', '')}
    // className='min-h-[25rem] max-h-[50rem]'
  ></iframe>
  {/* {onHover ? (  */}
  <span className="relative -inset-y-16 invisible group/edit group-hover/item:visible">
    <center><span className='bg-violet-500 p-3 rounded-lg text-white'>{"</>"}Get Code</span></center>
        
      </span>
     
      {/* ) : null} */}
      </Link>
</div>
<div className='flex justify-between mt-2 px-1'>
  <div className='flex items-center gap-2'>
    <div>
      <img src={element.UserImage} 
      className='rounded-full w-8 h-8'/>
    </div>
    <div>
    <p className='font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-cyan-400'>{element.userName}</p>
    </div>
  </div>
  <div className='flex gap-4'>
    <p className='flex items-center font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-cyan-400'>{getLikeNumber}</p>
   {session ? (<>
            {likes ? (
            <HeartIcon
              className="w-8 h-8 text-red-700 fill-red-700 transform transition duration-150 hover:scale-125"
              onClick={deletePost}
            />
          ) : (
            <HeartIcon
              className="w-8 h-8 text-white transform transition duration-500 hover:scale-150"
              onClick={LikePost}
            />
          )}
          </>):(<>
            <HeartIcon
              className="w-6 h-6 transform transition duration-500 hover:scale-125"
              onClick={() => signIn()}
            />
          </>)}
  </div>
</div>
</div>
  )
}


{/* <div>
<div class="container">
<div class="card">
<a class="card__link" href="#">




<div class="flex items-center justify-center place-content-center self-center">

  <iframe
    title="Live Preview"
    srcDoc={previewCode}
    width="100%"
    height="100%"
    className='live-preview-container min-h-[40vh] m'
  ></iframe>
</div>


<div class="card__header">
  <p class="card__header-title">Title of Card</p>
  <p class="card__header-meta">Subtitle</p>
</div>

</a>
</div>
</div>
</div> */}