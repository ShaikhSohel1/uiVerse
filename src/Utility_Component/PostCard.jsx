"use client"
import React, { useEffect, useState } from 'react'
import '../Style/PostCard.css'
import Link from 'next/link';

export default function PostCard({element}) {
  console.log(typeof(element))
  const [htmlCode, setHtmlCode] = useState(element.HtmlCode);
  const [cssCode, setCssCode] = useState(element.CssCode);
  const [previewCode, setPreviewCode] = useState('');

  useEffect(() => {
    // Combine HTML and CSS for live preview
  setPreviewCode(`
      <style>
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
        ${cssCode}
      </style>
      ${htmlCode}`);
  }, [htmlCode, cssCode]);

  // const handleHtmlChange = (event) => {
  //   setHtmlCode(event.target.value);
  // };

  // const handleCssChange = (event) => {
  //   setCssCode(event.target.value);
  // };

  // const [onHover, setonHover] = useState(false)

  return (
  
<div class="w-full rounded-lg shadow bg-[#2a303a] group/item "
>
<Link
href={{
  pathname: '/editor',
  query: { id: element.id },
}}
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
      </Link>
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