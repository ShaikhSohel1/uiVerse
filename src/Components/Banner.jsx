import PostCard from '@/Utility_Component/PostCard'
import React from 'react'

export default function Banner() {
  return (
    <section class="bg-transparent">
    <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div class="mr-auto place-self-center lg:col-span-7">
            <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-white ">Open-Source UI elements for any project</h1>
            <p class="max-w-2xl mb-6 text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400 font-medium">Create, share, and use <span className='text-violet-600'>beautiful</span> custom elements made with CSS or Tailwind.</p>
            <a href="#" class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900 hover:bg-[#1C2128]" >
                Get started
                <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </a>
        </div>
        <div class=" lg:mt-0 lg:col-span-5 lg:flex mt-8 flex items-center justify-center">
            <BannerImg />
        </div>                
    </div>
</section>
  )
}

const BannerImg = () => {
  const cssCode = `.pyramid-loader {
    position: relative;
    width: 300px;
    height: 300px;
    display: block;
    transform-style: preserve-3d;
    transform: rotateX(-20deg);
  }
  
  .wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    animation: spin 4s linear infinite;
  }
  
  @keyframes spin {
    100% {
      transform: rotateY(360deg);
    }
  }
  
  .pyramid-loader .wrapper .side {
    width: 170px;
    height: 170px;
  /* you can choose any gradient or color you want */
    /* background: radial-gradient( #2F2585 10%, #F028FD 70%, #2BDEAC 120%); */
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    transform-origin: center top;
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  }
  
  .pyramid-loader .wrapper .side1 {
    transform: rotateZ(-30deg) rotateY(90deg);
    background: conic-gradient( #2BDEAC, #F028FD, #D8CCE6, #2F2585);
  }
  
  .pyramid-loader .wrapper .side2 {
    transform: rotateZ(30deg) rotateY(90deg);
    background: conic-gradient( #2F2585, #D8CCE6, #F028FD, #2BDEAC);
  }
  
  .pyramid-loader .wrapper .side3 {
    transform: rotateX(30deg);
    background: conic-gradient( #2F2585, #D8CCE6, #F028FD, #2BDEAC);
  }
  
  .pyramid-loader .wrapper .side4 {
    transform: rotateX(-30deg);
    background: conic-gradient( #2BDEAC, #F028FD, #D8CCE6, #2F2585);
  }
  
  .pyramid-loader .wrapper .shadow {
    width: 60px;
    height: 60px;
    background: #8B5AD5;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    transform: rotateX(90deg) translateZ(-40px);
    filter: blur(12px);
  }`
  return(
    <div class="pyramid-loader">
  <div class="wrapper">
    <span class="side side1"></span>
    <span class="side side2"></span>
    <span class="side side3"></span>
    <span class="side side4"></span>
    <span class="shadow"></span>
  </div>  
  <style>{cssCode}</style>
</div>
  )
}