"use client";
import React, { useState } from "react";
import IssueViewModel from "./IssueViewModel";
import PostCard from "./PostCard";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import toast, { Toaster } from "react-hot-toast";

export default function IssueCard({ issue, notify }) {
  console.log(issue.id);
  const [open, setOpen] = useState(false);

  const mergeData = async () => {
    const docRef = await updateDoc(doc(db, "Posts", issue.PostId), {
      HtmlCode: issue.UpdatedHtmlCode,
      CssCode: issue.UpdatedCssCode,
      LastUpdated: serverTimestamp(),
    }).then((data) => console.log("Merge success..."));

    const q = query(
      collection(db, "Posts", issue.PostId, "Contributers"),
      where("UserEmail", "==", issue.UserEmail)
    );

    try {
      const querySnapshot = await getDocs(q);

      // Check if there are any matching documents
      if (!querySnapshot.empty) {
        // User is available in the collection
        console.log("User exists in the collection");
        await deleteDoc(doc(db, "Contributions", issue.id)).then((data) =>
          console.log("deleted success...")
        );
      } else {
        // User is not available in the collection
        console.log("User does not exist in the collection");
        toast("Merged Succesfully...", {
          icon: "✅",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });

        const docRef1 = await addDoc(
          collection(db, "Posts", issue.PostId, "Contributers"),
          {
            UserEmail: issue.UserEmail,
            UserName: issue.userName,
            UserImage: issue.UserImage,
          }
        ).then((data) => console.log("Contributers added success..."));

        await deleteDoc(doc(db, "Contributions", issue.id)).then((data) =>
          console.log("deleted success...")
        );
      }
    } catch (error) {
      console.error("Error querying the collection:", error);
    }

    console.log("mergeData");
  };

  const DeclineData = async () => {

    // Wait for the toast to complete (it will automatically disappear)

    const docRef = await deleteDoc(doc(db, "Contributions", issue.id));
    notify();

    console.log("DeclineData");
  };

  return (
    <div className="flex flex-col bg-[#2a303a] rounded-lg sm:flex-row p-5">
      <div className="w-full max-w-sm border-none flex mx-16">
        <div className="flex justify-end px-4 pt-4"></div>
        <div className="flex flex-col items-center pb-10 justify-center">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src={issue.UserImage}
            alt="Bonnie image"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {issue.userName}
          </h5>
          <span className="text-sm text-gray-400">{issue.UserEmail}</span>
          <div className="flex mt-4 space-x-3 md:mt-6">
            <button
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300  "
              onClick={mergeData}
            >
              Merge
            </button>
            <button
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
              onClick={DeclineData}
            >
              Decline
            </button>
          </div>
        </div>
      </div>
      <div className="w-full h-full flex flex-col  p-10   ">
        {/* description AND  button for view  */}
        <div className="flex flex-col space-y-28">
          <div className="flex justify-start flex-col">
            <p className="text-white text-lg font-semibold">Description</p>
            <p className="text-white text-sm font-medium bg-slate-600 justify-start p-5 rounded-lg">
              {issue.Description}
            </p>
          </div>

          <button
            className="font-bold text-xl mb-4 text-white cursor-pointer flex gap-3 items-center bg-[#1e1e1e] hover:bg-neutral-900 px-6 py-3 rounded-lg mt-6 w-fit"
            onClick={() => setOpen(true)}
          >
            View Issue
          </button>
        </div>
      </div>
      {open ? (
        <IssueViewModel open={open} setOpen={setOpen} issue={issue} />
      ) : null}
      <Toaster />
    </div>
  );
}
