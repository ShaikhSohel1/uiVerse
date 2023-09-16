"use client"
import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../../../firebase/firebase';
import { useSession } from "next-auth/react";

const UserActivity = () => {
  const { data: session } = useSession();
  const [heatmapData, setHeatmapData] = useState([]);
  const [activityData, setActivityData] = useState([]);

  const array =[]
  useEffect(() => {
    const getActivityData = async () => {
      if (session) {
        try {
          const activityCollectionRef = collection(db, "Users", session.user?.email, "Activity");
          const unsubscribe = onSnapshot(activityCollectionRef, (querySnapshot) => {
            const newData = querySnapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));
        
            setActivityData(newData);
            newData.map(i => {
              const item = {
                date: i.id,
                post: i.Activity,
              };
              array.push(item)
            })
            const data = generateDataArray();
          });
          return unsubscribe;
        } catch (error) {
          console.error("Error fetching activity data:", error);
        }
      }
    };
    getActivityData();

  }, []);

  const generateDataArray = () => {

      console.log(array)
      const dataMap = {};

      // Initialize dataMap with default values
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - 364); // Go back 365 days
      for (let i = 0; i < 365; i++) {
        const dateKey = currentDate.toISOString().slice(0, 10);

        dataMap[dateKey] = 0;
        currentDate.setDate(currentDate.getDate() + 1); // Increment date
      }
  
      // Update dataMap with values from the array
      for (const item of array) {
        console.log("asdasd")
        let [day, month, year] = item.date.split('-');
        if(month < 10)
        {
          month=`0${month}`
        }
        const isoDate = `${year}-${month}-${day}`;
        const dateKey = isoDate;
        if (dataMap.hasOwnProperty(dateKey)) {
          dataMap[dateKey] = item.post;
        }
      }
  
      // Convert dataMap to an array
      const data = Object.keys(dataMap).map((date) => ({
        date,
        value: dataMap[date],
      }));
  
      setHeatmapData(data)

  };

  return (
    <div>
      <div className="text-4xl px-10 font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-cyan-400 py-1 mt-4 text-center">
        Activity
      </div>
      <div className="text-md px-10 font-medium text-white py-1 mt-4 text-center cursor-default">
        Hover to See Your Activity
      </div>
      <div className="flex flex-wrap gap-[1.5px] mx-14 my-10">
        {heatmapData.map((item, index) => (
          <div
            key={index}
            className={`p-3 w-[1vw] h-[1vh] rounded-lg hover:cursor-pointer ${
              item.value === 0
                ? "bg-white"
                : item.value >= 1 && item.value <= 3
                ? "bg-green-300"
                : item.value > 3
                ? "bg-green-500"
                : ""
            }`}
            title={`Date: ${item.date}\nValue: ${item.value}`}
          >
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserActivity;
