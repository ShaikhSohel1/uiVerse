"use client"
import LegalModel from '@/Utility_Component/LegalModel';
import React, { useState } from 'react';
import { BsInstagram, BsTwitter, BsGithub, BsDiscord } from 'react-icons/bs';
import '../Style/socialButton.css';

export default function Footer() {
  const [open, setOpen] = useState(false)
  const[desc, setDesc] = useState('')
  const [title, setTitle] = useState('');

  // create a objext of about legal and contact us
  const about = {
    title: 'About Us',
    desc: 'uiVerse is a social media platform for developers and designers to share their work and interact with other developers and designers. We are a community of developers and designers who are passionate about what we do and want to share our work with the world. We hope you enjoy our platform and find it useful for your own projects!',
  }

  const legal = {
    title: 'Legal',
    desc: 'uiVerse is a social media platform for developers and designers to share their work and interact with other developers and designers. We are a community of developers and designers who are passionate about what we do and want to share our work with the world. We hope you enjoy our platform and find it useful for your own projects!',
  }

  const contact = {
    title: 'Contact Us',
    desc: 'uiVerse is a social media platform for developers and designers to share their work and interact with other developers and designers. We are a community of developers and designers who are passionate about what we do and want to share our work with the world. We hope you enjoy our platform and find it useful for your own projects!',
  }

  const policy = {
    title: 'Privacy Policy',
    desc: 'uiVerse is a social media platform for developers and designers to share their work and interact with other developers and designers. We are a community of developers and designers who are passionate about what we do and want to share our work with the world. We hope you enjoy our platform and find it useful for your own projects!',
  }


  const openModel = (desc, title) => {
    setDesc(desc);
    setTitle(title);
    setOpen(true);
   
  }


  return (
    <div className="bg-[#26282B] text-gray-300  ">
      <div className="px-4 py-10 mx-auto max-w-screen-xl sm:max-w-2xl md:max-w-4xl lg:max-w-6xl bottom-0">
        <div className="flex flex-col justify-between sm:flex-row gap-6">


<div className='text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-emerald-500 via-purple-700 to-teal-400 underline '>
uiVerse
</div>
        <div className='cursor-pointer'>
          
            <h3 className="text-xl font-semibold">About</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <a
                 onClick={() => openModel(about.desc, about.title)}
                  className="hover:text-indigo-400 "
                >
                  About Us
                </a>
              </li>
 
              <li>
                <a
       onClick={() => openModel(contact.desc, contact.title)}
                  className="hover:text-indigo-400"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-semibold">Information</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <a
                  href="/"
                  className="hover:text-indigo-400"
                >
                  News
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="hover:text-indigo-400"
                >
                  World
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="hover:text-indigo-400"
                >
                  Games
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="hover:text-indigo-400"
                >
                  References
                </a>
              </li>
            </ul>
          </div> */}

          <div className="mb-4 md:mb-0 cursor-pointer">
            <h3 className="text-xl font-semibold">Legal</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <a
           onClick={() => openModel(policy.desc, policy.title)}
                  className="hover:text-indigo-400"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                onClick={() => openModel(legal.desc, legal.title)}
                  className="hover:text-indigo-400"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          
        </div>

        <div className="flex justify-between items-center mt-8">
          <p className="text-sm">
            © {new Date().getFullYear()} Uiverse.tech. All rights reserved.
          </p>

          <div className="flex space-x-4">
            <a href="/" className="text-gray-300 hover:text-indigo-400">
              <BsInstagram />
            </a>
            <a href="/" className="text-gray-300 hover:text-indigo-400">
              <BsTwitter />
            </a>
            <a href="/" className="text-gray-300 hover:text-indigo-400">
              <BsGithub />
            </a>
            <a href="/" className="text-gray-300 hover:text-indigo-400">
              <BsDiscord />
            </a>
          </div>
        </div>
      </div>
      <LegalModel open={open} setOpen={setOpen} title = {title} desc= {desc}/>
    </div>

    
  );
}
