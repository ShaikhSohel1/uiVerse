"use client"
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState,Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { AiFillBell } from 'react-icons/ai';
import { db } from '../../firebase/firebase';
import { toast, Toaster } from 'react-hot-toast';

const NotificationModel = () => {
  const {data: session, status}= useSession();
  const cancelButtonRef = useRef(null)


  const [open, setOpen] = useState(false);
  const [notificationData, setNotificationData] = useState([]);
  const [notification, setNotification] = useState([]);



  // fetch from firedb of notificiation collection based on session user id

  const onDeleteNotification =  (id) => {
    const docRef = deleteDoc(doc(db, "Users", session.user?.email, "Notifications", id));
    console.log("Document deleted with ID: ", id);
    toast('Deleted Notification Successfully', {
    
      icon: '❎',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  }

  const getNotification = () => {
    console.log("LL")
 if(session){
  const NotificationCollectionRef =  query(collection(db, "Users",session.user?.email, "Notifications"),orderBy("timestamp", "desc"));
  
  // Set up a real-time listener
  const unsubscribe = onSnapshot(NotificationCollectionRef , (querySnapshot) => {
    const newData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setNotificationData(newData);
    console.log(newData)
    console.log("first")


  });

  // Clean up the listener when the component unmounts
  return unsubscribe;
 }
  };
  
  useEffect(() => {
    // Start the listener only once when the component mounts
    const unsubscribe = getNotification();
  
    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []); 


//     // filter data according to side bar selection
    useEffect(() => {
  
        // const filteredData = post.filter(
        //   (item) => (item.Element_Type != "Cards" && item.Element_Type != "Forms" )
        // );
        setNotification(notificationData);
    }, [notificationData]);


  return (
    <>
       
    <div>
      {notification.length != 0? (
          <AiFillBell className='text-red-500 text-3xl transform transition duration-150 hover:scale-125 hover:cursor-pointer' onClick={()=> setOpen(true)}/>
      ):null}
    

   <div>
   <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 flex items-center ">
                  <div className="sm:flex">
                 
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10 ">
                      <ExclamationTriangleIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left ">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900 mt-1">
                        Notifications
                      </Dialog.Title>
                      <div>
                       




                      <div class="w-full mt-6">
  <div class="flex flex-col  ">
    {
      notification.map((item) => (
        <div class="w-full p-3 " key={item}>
          <div class="bg-white border rounded shadow p-2">
            <div class="flex flex-row items-center">
              <div class="flex-1 text-sm">
                <p class="text-gray-900 leading-none">{item.notiification}</p>
               
              </div>
              <div class="flex-initial text-right w-12 text-gray-500" onClick={() =>onDeleteNotification(item.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ff0000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z"/>
                  <circle cx="12" cy="12" r="9" />
                  <path d="M10 10l4 4m0 -4l-4 4" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      ))
    }

  </div>

</div>












                      </div>
                     
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-500 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
   </div>
    </div>

    <Toaster />
    </>
  )
}

export default NotificationModel