"use client"
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import SavePostModel from '@/Utility_Component/SavePostModel';
import { addDoc, collection, doc, getDoc, getDocs, serverTimestamp, setDoc, updateDoc, increment } from "firebase/firestore"; 
import {db} from '../../firebase/firebase'
import { signIn, useSession } from 'next-auth/react';
import elements from '@/Utility_Component/ElementData';
import { CssSyntaxError } from 'postcss';
import SaveUpdateModel from '@/Utility_Component/SaveUpdateModel';
import SaveContributeModel from '@/Utility_Component/SaveContributeModel';
import Contributers from './Contributers';
import ContributionModel from '@/Utility_Component/ContributersModel';
import toast, { Toaster } from 'react-hot-toast';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import DropDownButton from '@/Utility_Component/DropDownButton';


export default function CustomEditor() {

  const router  = useRouter();
  // get post from params
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const {data: session, status}= useSession();
  const [previewCode, setPreviewCode] = useState('');
  const [activeTab, setActiveTab] = useState('html'); // To keep track of the active tab
  const [open, setOpen] = useState(false)
  const [postdata, setpostdata] = useState()
  const [htmlCode, setHtmlCode] = useState();
  const [cssCode, setCssCode] = useState();
  const [update,setupdate] = useState(false);
  const [contribute,setContribute] = useState(false);
const [contributersList, setcontributersList] = useState([])
const [ContributeModel, setContributeModel] = useState(false)
const currentDate = new Date();
const currentDateString = `${currentDate.getDate()}-${currentDate.getMonth()+1}-${currentDate.getFullYear()}`


  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };


  // save Post Data To Database
  const [elementType, setelementType] = useState("All")
  const [PostTitle, setPostTitle] = useState()
  const [Description, setDescription] = useState()

  const onActivity = async () => {
    const ActivityRef = doc(db, "Users", session.user?.email,"Activity", currentDateString);
    const acctivitySnapshot = await getDoc(ActivityRef);
    if (acctivitySnapshot.exists()) {
      const activtyref1 = await updateDoc(doc(db, "Users", session.user?.email,"Activity", currentDateString), {
        Activity: increment(1),
        Date: serverTimestamp(),
      });
    }
    else{
      const activtyref2 = await setDoc(doc(db, "Users", session.user?.email, "Activity",currentDateString),{
        Activity: 1,
        Date: serverTimestamp()
      }).then(data => console.log("success..."));
    }
  }

  const onSave = async () => {
    if(!htmlCode)
    {
      toast('What About HTML & CSS?',
      {
        icon: '❎',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      return
    }
    if(!PostTitle)
    {
      toast('What About Post Title?',
      {
        icon: '❎',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      return
    }
    const docRef = await addDoc(collection(db, "Posts"),{
      UserEmail: session.user?.email,
      UserImage:session.user?.image,
      userName: session.user?.name,
      HtmlCode: htmlCode,
      CssCode: cssCode,
      Element_Type: elementType,
      PostTitle: PostTitle,
      timestamp: serverTimestamp()
    }).then(data => console.log("success..."));




    const userDocumentRef = doc(db, "Users", session.user?.email);

// Check if the document exists before updating
const userDocumentSnapshot = await getDoc(userDocumentRef);
if (userDocumentSnapshot.exists()) {
  // Document exists, so you can update it
  const docRef1 = await updateDoc(doc(db, "Users", session.user?.email), {
    NoOfPosts: increment(1),
    timestamp: serverTimestamp(),
  });

 onActivity();

  console.log("Document updated successfully.");
} else {

  const docRef2 = await setDoc(doc(db, "Users", session.user?.email),{
    UserEmail: session.user?.email,
    UserImage:session.user?.image,
    UserName: session.user?.name,
    NoOfPosts: 1,
    timestamp: serverTimestamp()
  }).then(data => console.log("success..."));
  console.log("Document does not exist.");

  const docRef3 = await setDoc(doc(db, "Users", session.user?.email, "Activity",currentDateString),{
    Activity: 1,
    Date: serverTimestamp()
  }).then(data => console.log("success..."));




}

   
    toast('Saved Successfully...',
    {
      icon: '✅',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    }
  );
  
  }

  const onContribute = async () => {
    if(!htmlCode)
    {
      toast('What About HTML & CSS?',
      {
        icon: '❎',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      return
    }
    if(htmlCode == postdata.HtmlCode && cssCode == postdata.CssCode)
    {
      toast('Is This What You Call Contribution?',
      {
        icon: '❎',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      return
    }
    
    if(!Description)
    {
      toast('What About Description?',
      {
        icon: '❎',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      return
    }

    if(postdata){
      const docRef = await addDoc(collection(db, "Contributions"),{
        UserEmail: session.user?.email,
        UserImage:session.user?.image,
        userName: session.user?.name,
        Description : Description,
        PostId : id,
        OwnerEmail : postdata.UserEmail,
        OwnerName : postdata.userName,
        UpdatedHtmlCode: htmlCode,
        UpdatedCssCode: cssCode,
        Element_Type: postdata.Element_Type,
        PostTitle: postdata.PostTitle,
        timestamp: serverTimestamp()
      }).then(data => console.log("success..."));
      onActivity();
      toast('Contributed Successfully! Wait till Owner Review Your Contribution...',
      {
        icon: '✅',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      }
    );
      console.log("Contributed",postdata.UserEmail)
    }
    else{
      console.log("not found")
    }
   
  
  }

 // create on update functionality
  const onUpdate = async () => {
    if(!htmlCode)
    {
      toast('What About HTML & CSS?',
      {
        icon: '❎',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      return
    }
    if(!PostTitle)
    {
      toast('What About Post Title?',
      {
        icon: '❎',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      return
    }
    
    if(postdata){
      const docRef = await updateDoc(doc(db, "Posts", id),{
        UserEmail: session.user?.email,
        UserImage:session.user?.image,
        userName: session.user?.name,
        HtmlCode: htmlCode,
        CssCode: cssCode,
        Element_Type: elementType,
        PostTitle: PostTitle,
        timestamp: serverTimestamp()
      }).then(data => console.log("success..."));
      onActivity();
      toast('Updated Successfully...',
      {
        icon: '✅',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      }
    );

      console.log("updated")

    }
    else{
      console.log("not found")
    }
  }
  
// Get Post Data with id 
  const getPostData = async () => {
    const docRef = await getDoc(doc(db, "Posts", id)).then(
      (querySnapshot) => {
        const newData = querySnapshot.data();
       setpostdata(newData)
       setHtmlCode(newData.HtmlCode)
       setCssCode(newData.CssCode)
       setPostTitle(newData.PostTitle)
      }
    );
    const docRef1 = await getDocs(collection(db, "Posts", id, "Contributers")).then(
      (querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
       setcontributersList(newData)
        console.log(newData);
      }
    );
  };



  useEffect(() => {
    if(id)
    {
      getPostData();
    }
    else{
      setHtmlCode('');
      setCssCode('');
      setpostdata();
      setcontributersList([]);
    }
   
  }, [id]);

  
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
  }, [id, htmlCode, cssCode]);


  return (
    <>
       <div className='flex justify-between px-5'>
       <h1 className="font-bold text-xl mb-4 w-fit text-white cursor-default flex gap-3 items-center hover:bg-slate-600 px-6 py-3 rounded-lg hover:cursor-pointer"
    onClick={() => router.back()}
    ><AiOutlineArrowLeft /> Go Back</h1>
<DropDownButton elements={elements} />
  </div>
     
    {postdata ? (
    <div className='flex justify-between'>
          <p className='sm:text-3xl text-sm px-10 font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-cyan-400'>
  {postdata && postdata.PostTitle}
</p>
      <p className='sm:text-3xl px-10 text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-cyan-400'>
  {postdata && `#${postdata.Element_Type}`}
</p>
      </div>
      ) : null}
          
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 m-4">

     
      <div className="p-6 h-[80vh] placeholder-white placeholder-opacity-50 xs:rounded-t-[12px] lg:rounded-l-[12px] resize-none focus:outline-none focus:border-transparent bg-[#212121] text-white">
        <iframe
          title="Live Preview"
          srcDoc={previewCode}
          width="100%"
          height="100%"
          className="live-preview-container"
        ></iframe>
      </div>
      <div className="h-[80vh] placeholder-white placeholder-opacity-50 xs:rounded-b-[12px] lg:rounded-r-[12px] resize-none focus:outline-none focus:border-transparent bg-[#212121] text-white">
        <div className="flex w-full bg-[#212121] m-0 px-9 gap-10 cursor-default">
          <div
            className={`p-3 cursor-pointer px-10 rounded-t-xl flex ${
              activeTab === 'html' ? 'bg-[#1e1e1e]' : ''
            }`}
            onClick={() => handleTabClick('html')}
          >
            <img src='https://img.icons8.com/color/48/000000/html-5--v1.png' className='w-7 h-7' />
            HTML
          </div>
          <div
            className={`p-3 px-10 cursor-pointer rounded-t-xl flex ${
              activeTab === 'css' ? 'bg-[#1e1e1e]' : ''
            }`}
            onClick={() => handleTabClick('css')}
          >
            <img src='https://img.icons8.com/color/48/000000/css3.png' className='w-7 h-7' />
            CSS
          </div>
        </div>
        <div>
          {activeTab === 'html' ? (
            <Editor
              height="74.9vh"
              language="html"
              value={htmlCode}
              theme="vs-dark"
              options={{
                fontSize: '16px',
                autoClosingBrackets: true,
                minimap: { enabled: false },
                wordWrap: 'on',
              }}
              onChange={(value) => setHtmlCode(value)}
            />
          ) : (
            <Editor
              height="74.9vh"
              language="css"
              value={cssCode}
              theme="vs-dark"
              options={{
                fontSize: '16px',
                autoClosingBrackets: true,
                minimap: { enabled: false },
                wordWrap: 'on',
              }}
              onChange={(value) => setCssCode(value)}
            />
          )}
        </div>
        
      </div>
     
    </div>
     <div className='flex justify-between'>
      {postdata ? (
             <div className='flex items-center gap-2'>
             <div className='px-6'>
               <img src={postdata && postdata.UserImage} 
               className='rounded-full w-12 h-12'/>
             </div>
             <div>
             <p className='font-bold text-transparent bg-clip-text text-xl bg-gradient-to-r from-green-500 to-cyan-400'>{postdata && postdata.userName}</p>
             </div>
           </div>
      ) : (
        <div></div>
      )}
      {session ? (
        <>
          {postdata ? (
    
            postdata.UserEmail == session.user.email ? (
              <button className="font-bold text-xl mb-4 text-white cursor-pointer flex gap-3 items-center bg-[#1e1e1e] hover:bg-neutral-900 px-6 py-3 rounded-lg mt-6 mx-10"
              onClick={() => setupdate(true)}
              >Update</button>
             
             ) : (
               <button className="font-bold text-xl mb-4 text-white cursor-pointer flex gap-3 items-center bg-[#1e1e1e] hover:bg-neutral-900 px-6 py-3 rounded-lg mt-6 mx-10"
               onClick={() => setContribute(true)}
               >Contribute</button>
             )
            
              ) : (
                <button className="font-bold text-xl mb-4 text-white cursor-pointer flex gap-3 items-center bg-[#1e1e1e] hover:bg-neutral-900 px-6 py-3 rounded-lg mt-6 mx-10"
               onClick={() => setOpen(true)}
               >Save</button> 
              )}
              </>
      ): (
        <button className="font-bold text-xl mb-4 text-white flex gap-3 items-center bg-[#1e1e1e] hover:bg-neutral-900 px-6 py-3 rounded-lg mt-6 mx-10 cursor-pointer"
               onClick={() => signIn()}
               >SignIn</button> 
      )}



        </div>



{!contributersList.length == 0 ? (
 <div className='flex flex-col '>
 <p className='text-2xl text-white font-semibold mx-5 '>Contributers:</p>
 <div className='flex justify-end sm:justify-start lg:justify-end xl:justify-start -space-x-1.5 mt-4 hover:bg-slate-800 px-6 py-1 mb-5 w-fit rounded-lg hover:cursor-pointer'
 onClick={() => setContributeModel(true)}
 >
 {contributersList && contributersList.slice(0, 5).map((i) => (
     <img key={i} className="w-10 h-10  mb-3 rounded-full shadow-lg" src={i.UserImage} alt="Bonnie image"/>
 ))}
 
 </div>

</div>
): null}
       





  


       <Toaster />

{ContributeModel ?(<ContributionModel open={ContributeModel} setOpen={setContributeModel} contributersList={contributersList}/> )  : null }
   {open ? (
    <SavePostModel open={open} setOpen={setOpen} setelementType={setelementType} setPostTitle={setPostTitle} onSave={onSave} />
     ) : null}

{update ? (
      <SaveUpdateModel open={update} setOpen={setupdate} setelementType={setelementType} setPostTitle={setPostTitle} PostTitle={PostTitle}  onSave={onUpdate} />
     ) : null}

{contribute ? (
      <SaveContributeModel open={contribute} setOpen={setContribute}   onSave={onContribute}  setPostTitle={setDescription}/>
     ) : null}
   </>
  );
}
