"use client"
import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../../../firebase/firebase';
import { useSession } from "next-auth/react";
import HeatMap from "@uiw/react-heat-map";
import Tooltip from '@uiw/react-tooltip';

// const UserActivity = () => {
//   const { data: session } = useSession();
//   const [heatmapData, setHeatmapData] = useState([]);
//   const [activityData, setActivityData] = useState([]);

//   const array =[]
//   useEffect(() => {
//     const getActivityData = async () => {
//       if (session) {
//         try {
//           const activityCollectionRef = collection(db, "Users", session.user?.email, "Activity");
//           const unsubscribe = onSnapshot(activityCollectionRef, (querySnapshot) => {
//             const newData = querySnapshot.docs.map((doc) => ({
//               ...doc.data(),
//               id: doc.id,
//             }));
        
//             setActivityData(newData);
//             newData.map(i => {
//               const item = {
//                 date: i.id,
//                 post: i.Activity,
//               };
//               array.push(item)
//             })
//             const data = generateDataArray();
//           });
//           return unsubscribe;
//         } catch (error) {
//           console.error("Error fetching activity data:", error);
//         }
//       }
//     };
//     getActivityData();

//   }, []);

//   const generateDataArray = () => {

//       console.log(array)
//       const dataMap = {};

//       // Initialize dataMap with default values
//       const currentDate = new Date();
//       currentDate.setDate(currentDate.getDate() - 364); // Go back 365 days
//       for (let i = 0; i < 365; i++) {
//         const dateKey = currentDate.toISOString().slice(0, 10);

//         dataMap[dateKey] = 0;
//         currentDate.setDate(currentDate.getDate() + 1); // Increment date
//       }
  
//       // Update dataMap with values from the array
//       for (const item of array) {
//         console.log("asdasd")
//         let [day, month, year] = item.date.split('-');
//         if(month < 10)
//         {
//           month=`0${month}`
//         }
//         const isoDate = `${year}-${month}-${day}`;
//         const dateKey = isoDate;
//         if (dataMap.hasOwnProperty(dateKey)) {
//           dataMap[dateKey] = item.post;
//         }
//       }
  
//       // Convert dataMap to an array
//       const data = Object.keys(dataMap).map((date) => ({
//         date,
//         value: dataMap[date],
//       }));
  
//       setHeatmapData(data)

//   };

//   return (
//     <div>
//       <div className="text-4xl px-10 font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-cyan-400 py-1 mt-4 text-center">
//         Activity
//       </div>
//       <div className="text-md px-10 font-medium text-white py-1 mt-4 text-center cursor-default">
//         Hover to See Your Activity
//       </div>
//       <div className="flex flex-wrap gap-[1.5px] mx-14 my-10">
//         {heatmapData.map((item, index) => (
//           <div
//             key={index}
//             className={`p-3 w-[1vw] h-[1vh] rounded-lg hover:cursor-pointer ${
//               item.value === 0
//                 ? "bg-white"
//                 : item.value >= 1 && item.value <= 3
//                 ? "bg-green-300"
//                 : item.value > 3
//                 ? "bg-green-500"
//                 : ""
//             }`}
//             title={`Date: ${item.date}\nPosts: ${item.value}`}
//           >
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

const UserActivity = () => {
  const { data: session } = useSession();
  const [heatmapData, setHeatmapData] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [value, setValue] = useState([]);
  const startDate = new Date();
 startDate.setDate(startDate.getDate() - 364); // Go back 365 days

 const endDate = new Date();

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
              let [day, month, year] = i.id.split('-');
                       if(month < 10)
                    {
                     month=`0${month}`
                   }
                      const isoDate = `${year}/${month}/${day}`;
              const item = {
                date: isoDate,
                count: i.Activity,
              };
              array.push(item)
             
              console.log(array)
            })
        
          });
          setValue(array)
          console.log(value)
          return unsubscribe;
        } catch (error) {
          console.error("Error fetching activity data:", error);
        }
      }
    };
    getActivityData();

  }, []);
  

  // const value = [
  //   { date: '2016/01/11', count:2 },
  //   { date: '2016/04/12', count:2 },
  //   { date: '2016/05/01', count:5 },
  //   { date: '2016/05/02', count:5 },
  //   { date: '2016/05/03', count:1 },
  //   { date: '2016/05/04', count:11 },
  //   { date: '2016/05/08', count:32 },
  // ];
  return(
    <div className="p-8 flex flex-col items-center justify-center w-full ">
       <div className="text-4xl px-10 font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-cyan-400 py-1 mt-4 text-center">
        Activity
       </div>
       <div className="text-md px-10 font-medium text-white py-1 mt-4 text-center cursor-default mb-4">
         Hover to See Your Activity
       </div>
    <div className="overflow-auto w-full xl:ml-56 scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-slate-700  scrollbar-thumb-opacity-50 scrollbar-track-opacity-50">
      {value.length != 0 && (<HeatMap
        value={value}
        width={1500}
        height={300}
        rectSize={25}
        style={{ color: '#FFFFFF', '--rhm-rect-active': 'green' }}
        startDate={startDate}
        endDate={endDate}
        panelColors={{
          0: '#EBEDF0',
          2: '#C6E48B',
          4: '#239A3B',
          6: '#239A3B',
        }}

        rectRender={(props, data) => {
        
          return (
            <Tooltip placement="top" content={`Date: ${data.date}, Post: ${data.count || 0}`}>
              <rect {...props} />
            </Tooltip>
          );
        }}
      />)}
      
    </div>
  </div>
 
  )
};

export default UserActivity;
