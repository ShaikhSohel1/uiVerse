"use client"
import React, { useEffect, useState } from 'react'
import '../Style/PostCard.css'

export default function PostCard() {
  const [htmlCode, setHtmlCode] = useState(`<div class="pyramid-loader">
  <div class="wrapper">
    <span class="side side1"></span>
    <span class="side side2"></span>
    <span class="side side3"></span>
    <span class="side side4"></span>
    <span class="shadow"></span>
  </div>
</div>
`);
  const [cssCode, setCssCode] = useState(`
  .pyramid-loader {
    position: relative;
    width: 300px;
    height: 150px;
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
    width: 70px;
    height: 70px;
    background: linear-gradient(to bottom right, #FFA500, #FF4500);
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
    background: linear-gradient(to bottom right, #FF4500, #FFA500);
  }
  
  .pyramid-loader .wrapper .side2 {
    transform: rotateZ(30deg) rotateY(90deg);
    background: linear-gradient(to bottom right, #FFA500, #FF4500);
  }
  
  .pyramid-loader .wrapper .side3 {
    transform: rotateX(30deg);
    background: linear-gradient(to bottom right, #FFA500, #FF4500);
  }
  
  .pyramid-loader .wrapper .side4 {
    transform: rotateX(-30deg);
    background: linear-gradient(to bottom right, #FF4500, #FFA500);
  }
  
  .pyramid-loader .wrapper .shadow {
    width: 60px;
    height: 60px;
    background: #FF8C00;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    transform: rotateX(90deg) translateZ(-40px);
    filter: blur(12px);
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
          height: 100vh;
          margin: 0;
        }
        ${cssCode}
      </style>
      ${htmlCode}`);
  }, [htmlCode, cssCode]);

  const handleHtmlChange = (event) => {
    setHtmlCode(event.target.value);
  };

  const handleCssChange = (event) => {
    setCssCode(event.target.value);
  };

  return (
    <div>
      <div class="container">
	<div class="card">
		<a class="card__link" href="#">
		
			
			<div class="card__icon">
				
			</div>

			
			<div class="flex items-center justify-center place-content-center self-center">
				{/* live preview */}
        <iframe
          title="Live Preview"
          srcDoc={previewCode}
          width="100%"
          height="100%"
          className='live-preview-container'
        ></iframe>
			</div>

			
			<div class="card__header">
				<p class="card__header-title">Title of Card</p>
				<p class="card__header-meta">Subtitle</p>
				{/* <div class="card__header-icon">
					
				</div> */}
			</div>
			
		</a>
	</div>
</div>
    </div>
  )
}
