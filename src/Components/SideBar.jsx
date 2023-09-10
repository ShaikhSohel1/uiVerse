import React from 'react'
import elements from '@/Utility_Component/ElementData'

export default function SideBar() {
 
  return (
    <div>
      

<aside id="logo-sidebar" class="w-[15%] transition-transform hidden lg:block border-gray-700">
   <div class=" overflow-y-auto">
      <ul class="space-y-2 font-medium">
        {elements.map((i) => {
          return(
<li>
          <a href="" class="flex items-center p-2 rounded-lg text-white hover:text-slate-800 hover:bg-gray-100 group">
             <span class="ml-3 fixed">{i.ElementName}</span>
          </a>
       </li>
          )
          
        })}
      </ul>
   </div>
   
</aside>



    </div>
  )
}
