"use client"

import React, { useEffect, useState } from 'react';
import elements from '@/Utility_Component/ElementData';

export default function SideBar() {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    // Add an event listener to track scroll position
    const handleScroll = () => {
      if (window.scrollY > 10) { // Adjust the scroll threshold as needed
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const sidebarClasses = isFixed
    ? 'fixed top-6 w-[10em] xl:w-[12em] h-screen overflow-y-auto hidden lg:block '
    : 'hidden lg:block border-gray-700';

  return (
    <div>
      <aside
        id="logo-sidebar"
        className={sidebarClasses}
      >
        <div className="w-full">
          <ul className="space-y-2 font-medium ml-6">
            {elements.map((i) => (
              <li key={i}>
                <a
                  href=""
                  className="flex items-center p-2 rounded-lg text-white hover:text-slate-800 hover:bg-gray-100 group"
                >
                  <span>{i.ElementName}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}

