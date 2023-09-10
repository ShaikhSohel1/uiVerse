"use client"
import React, { useEffect, useState } from 'react'
import '../Style/PostCard.css'

export default function PostCard() {
  const [htmlCode, setHtmlCode] = useState(`
  <div class="container">
  <div class="palette">
    <div class="color" id="color1">
      <span>#4B0082</span>
    </div>
    <div class="color" id="color2">
      <span>#8A2BE2</span>
    </div>
    <div class="color" id="color3">
      <span>#9932CC</span>
    </div>
    <div class="color" id="color4">
      <span>#BA55D3</span>
    </div>
    <div id="color-code">
      <div id="color-code-bg"></div>
      <div id="color-code-text"></div>
    </div>
  </div>
  <div id="footer">
    <div id="bookmarks">
      <svg stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="currentColor" fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
      </svg>
      <span>53421</span>
    </div>
    <svg stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="currentColor" fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
      <circle r="1" cy="12" cx="12"></circle>
      <circle r="1" cy="12" cx="19"></circle>
      <circle r="1" cy="12" cx="5"></circle>
    </svg>
  </div>
</div>

`);
  const [cssCode, setCssCode] = useState(`
  .container {
    width: 300px;
    height: 340px;
    border-radius: 1em;
    overflow: hidden;
    box-shadow: 0 10px 20px #dbdbdb;
    font-family: sans-serif;
    background: white;
    pointer-events: none;
  }
  
  .palette {
    position: relative;
    width: 300px;
    height: 300px;
    border-radius: 1rem;
    overflow: hidden;
    pointer-events: auto;
  }
  
  .palette:hover > #color-code {
    opacity: 0;
  }
  
  .color {
    position: absolute;
    width: 300px;
    height: 300px;
    transform-origin: center;
    transition: 0.3s ease-in-out;
    box-sizing: inline-block;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .color span {
    color: white;
    font-weight: 600;
    letter-spacing: 1px;
  }
  
  #color1 {
    background: #4B0082;
    rotate: 45deg;
    translate: 212.13px 0;
    outline: 0 solid #4B0082;
    z-index: 9;
  }
  
  #color1:hover {
    translate: 0 0;
    rotate: 0deg;
    z-index: 99;
    outline: 20px solid #4B0082;
  }
  
  #color2 {
    background: #8A2BE2;
    rotate: 45deg;
    translate: 0 212.13px;
    outline: 0 solid #8A2BE2;
    z-index: 9;
  }
  
  #color2:hover {
    translate: 0 0;
    rotate: 0deg;
    z-index: 99;
    outline: 20px solid #8A2BE2;
  }
  
  #color2 span {
    color: #1A1A1A;
  }
  
  #color3 {
    background: #9932CC;
    rotate: 45deg;
    translate: -212.13px 0;
    outline: 0 solid #9932CC;
    z-index: 9;
  }
  
  #color3:hover {
    translate: 0 0;
    rotate: 0deg;
    z-index: 99;
    outline: 20px solid #9932CC;
  }
  
  #color4 {
    background: #BA55D3;
    rotate: 45deg;
    translate: 0 -212.13px;
    outline: 0 solid #BA55D3;
    z-index: 9;
  }
  
  #color4:hover {
    translate: 0 0;
    rotate: 0deg;
    z-index: 99;
    outline: 20px solid #BA55D3;
  }
  
  #color-code {
    position: absolute;
    top: 0;
    left: 0;
    width: 40px;
    height: 40px;
    translate: 130px 130px;
    border-radius: 20px;
    overflow: hidden;
    z-index: 199;
    opacity: 1;
    transition: 0.3s ease-in-out;
  }
  
  #color-code-bg {
    position: absolute;
    width: 40px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.8);
    filter: blur(10px);
  }
  
  #color-code-text {
    position: absolute;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  #color-code-text::after {
    content: "v2";
    font-weight: 600;
    font-family: sans-serif;
    color: #1a1a1a;
  }
  
  #footer {
    height: 12%;
    width: 100%;
    background: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1em;
    box-sizing: border-box;
    color: #bebebe;
  }
  
  #footer svg {
    scale: 0.75;
  }
  
  #footer #bookmarks {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: smaller;
  }
  `);
  const [previewCode, setPreviewCode] = useState('');

  useEffect(() => {
    // Combine HTML and CSS for live preview
    setPreviewCode(`
      <style>
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 30px
        
        }
        ${cssCode}
      </style>
      ${htmlCode}
      `);
  }, [htmlCode, cssCode]);

  const handleHtmlChange = (event) => {
    setHtmlCode(event.target.value);
  };

  const handleCssChange = (event) => {
    setCssCode(event.target.value);
  };

  const [onHover, setonHover] = useState(false)

  return (
  
<div class="w-full rounded-lg shadow bg-[#2a303a] group/item "
>

<iframe
    title="Live Preview"
    srcDoc={previewCode}
    width="100%"
    height="100%"
    className='min-h-[25rem] max-h-[50rem]'
  ></iframe>
  {/* {onHover ? (  */}
  <span className="relative -inset-y-10 invisible group/edit group-hover/item:visible left-28">
    <center><span className='bg-violet-500 p-3 rounded-lg text-white'>{"</>"}Get Code</span></center>
        
      </span>
     
      {/* ) : null} */}
    
</div>

  )
}


{/* <div>
<div class="container">
<div class="card">
<a class="card__link" href="#">




<div class="flex items-center justify-center place-content-center self-center">

  <iframe
    title="Live Preview"
    srcDoc={previewCode}
    width="100%"
    height="100%"
    className='live-preview-container min-h-[40vh] m'
  ></iframe>
</div>


<div class="card__header">
  <p class="card__header-title">Title of Card</p>
  <p class="card__header-meta">Subtitle</p>
</div>

</a>
</div>
</div>
</div> */}