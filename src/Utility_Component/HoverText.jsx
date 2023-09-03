"use client"
import React from 'react'

export default function HoverText() {
    const cssCode = `.p {
        font-size: 18px;
        color: #e1e1e1;
        font-family: inherit;
        font-weight: 800;
        cursor: pointer;
        position: relative;
        border: none;
        background: none;
        text-transform: uppercase;
        transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
        transition-duration: 400ms;
        transition-property: color;
      }
      
      .p:focus,
      .p:hover {
        color: #fff;
      }
      
      .p:focus:after,
      .p:hover:after {
        width: 100%;
        left: 0%;
      }
      
      .p:after {
        content: "";
        pointer-events: none;
        bottom: -2px;
        left: 50%;
        position: absolute;
        width: 0%;
        height: 2px;
        background-color: #fff;
        transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
        transition-duration: 400ms;
        transition-property: width, left;
      }`
  return (
    <div>
    <p className='p'>
    Hover Over
</p>
<style>{cssCode}</style>
</div>
  )
}
