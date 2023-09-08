"use client"
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Button from '@/Utility_Component/Button'
import { signIn, useSession, signOut } from 'next-auth/react'
import Link from 'next/link'


const navigation = [
  { name: 'Home', href: '/', current: false },
  { name: 'Browse', href: '/browse', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NavBar() {

  const {data: session, status}= useSession();


  return (
    <Disclosure as="nav" className="bg-[#22272E]">
      {({ open }) => (
        <>
          <div className=" px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-20 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden ">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-7 w-auto mx-7 mt-2 hidden lg:flex md:flex"
                    src="https://uiverse.io/build/_assets/logo-OR7QQX33.svg"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block flex-1">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-lg font-medium'
                        )}
                      
                      >
                        {item.name}
                      </Link>
                    ))}

                   
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">


                {/* Create Posts */}
                          <div className='flex gap-3'>

                <Button />
                {status==='authenticated' ? (
   <Menu as="div" className="relative ml-3">
   <div>
     <Menu.Button className="relative flex rounded-full mt-[5px] bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
       <span className="absolute -inset-1.5" />
       <span className="sr-only">Open user menu</span>
       <img
         className="h-8 w-8 rounded-full"
         src={session.user.image}
         alt=""
       />
     </Menu.Button>
   </div>
   <Transition
     as={Fragment}
     enter="transition ease-out duration-100"
     enterFrom="transform opacity-0 scale-95"
     enterTo="transform opacity-100 scale-100"
     leave="transition ease-in duration-75"
     leaveFrom="transform opacity-100 scale-100"
     leaveTo="transform opacity-0 scale-95"
   >
     <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
       <Menu.Item>
         {({ active }) => (
           <a
             href="#"
             className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
           >
             Your Profile
           </a>
         )}
       </Menu.Item>
       <Menu.Item>
         {({ active }) => (
           <a
             href="#"
             className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
             onClick={()=>signOut()}
           >
             Sign out
           </a>
         )}
       </Menu.Item>
     </Menu.Items>
   </Transition>
 </Menu>
                ):(
                  <SigninButton />
                )}
                
             
                          </div>

                          {/*sign in buttuon  */}
                          

                {/* Profile dropdown */}
              
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}



const SigninButton = () => {
  const cssCode = `.button1 {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 15px;
    gap: 15px;
    background-color: #181717;
    outline: 3px #181717 solid;
    outline-offset: -3px;
    border-radius: 13px;
    border: none;
    cursor: pointer;
    transition: 400ms;
  }
  
  .button1 .text {
    color: white;
    font-weight: 700;
    font-size: 1em;
    transition: 400ms;
  }
  
  .button1 svg path {
    transition: 400ms;
  }
  
  .button1:hover {
    background-color: transparent;
  }
  
  .button1:hover .text {
    color: white;
  }
  
  .button1:hover svg path {
    fill: white;
  }`
  return(
    <div>
    <button class="button1" onClick={()=> signIn("github")}>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 0.296997C5.37 0.296997 0 5.67 0 12.297C0 17.6 3.438 22.097 8.205 23.682C8.805 23.795 9.025 23.424 9.025 23.105C9.025 22.82 9.015 22.065 9.01 21.065C5.672 21.789 4.968 19.455 4.968 19.455C4.422 18.07 3.633 17.7 3.633 17.7C2.546 16.956 3.717 16.971 3.717 16.971C4.922 17.055 5.555 18.207 5.555 18.207C6.625 20.042 8.364 19.512 9.05 19.205C9.158 18.429 9.467 17.9 9.81 17.6C7.145 17.3 4.344 16.268 4.344 11.67C4.344 10.36 4.809 9.29 5.579 8.45C5.444 8.147 5.039 6.927 5.684 5.274C5.684 5.274 6.689 4.952 8.984 6.504C9.944 6.237 10.964 6.105 11.984 6.099C13.004 6.105 14.024 6.237 14.984 6.504C17.264 4.952 18.269 5.274 18.269 5.274C18.914 6.927 18.509 8.147 18.389 8.45C19.154 9.29 19.619 10.36 19.619 11.67C19.619 16.28 16.814 17.295 14.144 17.59C14.564 17.95 14.954 18.686 14.954 19.81C14.954 21.416 14.939 22.706 14.939 23.096C14.939 23.411 15.149 23.786 15.764 23.666C20.565 22.092 24 17.592 24 12.297C24 5.67 18.627 0.296997 12 0.296997Z" fill="white"></path>
  </svg>
  <p class="text">Click me</p>
</button>
<style>{cssCode}</style>
    </div>
  )
}