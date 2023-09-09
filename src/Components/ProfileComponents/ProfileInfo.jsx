"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

export default function ProfileInfo() {
  const { data: session, status } = useSession();

  return (
    <div className="flex items-center justify-center space-x-9 p-10">

      <div className="use_icon">
        {session ? (
          <img
            className="h-20 w-20 rounded-full mx-7 mt-2 lg:flex md:flex"
            src={session.user?.image}
            // width="30px"
            // height="20px"
            alt="Your Company"
          />
        ) : (
          <img
            className="h-9 w-auto mx-7 mt-2 lg:flex md:flex"
            src=""
            // width="30px"
            // height="20px"
            alt="Your Company"
          />
        )}
      </div>

      <div className="user_info text-white font-bold">
        {session ? (
            <div>
 <p>User Name: {session.user.name}</p>
        <p>Email: {session.user.email}</p>
        <p>Posts: 78</p>
                </div>
        ): (
            <div>
            <p>User Name: ????</p>
                   <p></p>
                           </div>
        )}
       
      </div>
    </div>
  );
}
