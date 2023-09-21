import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import elements from './ElementData'
import { Editor } from '@monaco-editor/react'

export default function IssueViewModel({open,setOpen, issue}) {
    const [htmlCode, setHtmlCode] = useState();
    const [cssCode, setCssCode] = useState();
    const [previewCode, setPreviewCode] = useState('');
    const [activeTab, setActiveTab] = useState(''); 



    const handleTabClick = (tab) => {
        setActiveTab(tab);
      };
  

  const cancelButtonRef = useRef(null)
  

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
        ${issue.UpdatedCssCode}
      </style>
      ${issue.UpdatedHtmlCode}`);
  }, [issue]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="">
                <div className="w-full flex items-center justify-center ">
                  <div className=" w-full">
                    
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left flex flex-col items-center ">
                      <Dialog.Title as="h3" className="text-4xl px-10 font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-cyan-400 mt-1 ">
                        {issue.userName}
                      </Dialog.Title>
                      <div>
                       {/* Live Preview Of Contributors Updated Code */}
 





                       <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 mt-6 w-[80vw]">

     
<div className="p-6 h-[80vh] placeholder-white placeholder-opacity-50 xs:rounded-t-[12px] lg:rounded-l-[12px] focus:outline-none focus:border-transparent bg-[#212121] text-white">
  <iframe
    title="Live Preview"
    srcDoc={previewCode}
    width="100%"
    height="100%"
    className="live-preview-container"
  ></iframe>
</div>
<div className="h-[80vh] placeholder-white placeholder-opacity-50 rounded-xl resize-none focus:outline-none focus:border-transparent bg-[#1e1e1e] text-white">
  <div className="flex w-full bg-[#181515] m-0 px-9 gap-10 cursor-default rounded-r-lg">
    <div
      className={`p-3 cursor-pointer px-10 rounded-t-xl flex ${
        activeTab === 'html' ? 'bg-[#1e1e1e]' : ''
      }`}
      onClick={() => handleTabClick('html')}
    >
      <img src='https://img.icons8.com/color/48/000000/html-5--v1.png' className='w-7 h-7' />
      HTML
    </div>
    <div
      className={`p-3 px-10 cursor-pointer rounded-t-xl flex ${
        activeTab === 'css' ? 'bg-[#1e1e1e]' : ''
      }`}
      onClick={() => handleTabClick('css')}
    >
      <img src='https://img.icons8.com/color/48/000000/css3.png' className='w-7 h-7' />
      CSS
    </div>
  </div>
  <div  className='rounded-lg' >
    {activeTab === 'html' ? (
      // disable this editoe

      <Editor
       
        height="74.1vh"
        language="html"
        value={issue.UpdatedHtmlCode}
        theme="vs-dark"
        options={{
          fontSize: '16px',
          autoClosingBrackets: true,
          minimap: { enabled: false },
          wordWrap: 'on',
          domReadOnly: false,
        acceptSuggestionOnCommitCharacter: true,
        acceptSuggestionOnEnter: 'on',
        screenReaderAnnounceInlineSuggestions: true,
        accessibilitySupport: 'auto',
        autoIndent: 'full',
        automaticLayout: true,
        codeLens: true,
        colorDecorators: true,
        contextmenu: true,
        cursorBlinking: 'blink',
        cursorSmoothCaretAnimation: true,
        cursorStyle: 'line',
       

          
        }}
        

        
      />
    ) : (
      <Editor
        height="74.1vh"
        language="css"
        value={issue.UpdatedCssCode}
        theme="vs-dark"
        options={{
          fontSize: '16px',
          autoClosingBrackets: true,
          minimap: { enabled: false },
          wordWrap: 'on',
        }}
        
      />
    )}
  </div>
  
</div>

</div> 





                      </div>
                     
                    </div>
                  </div>
                </div>
                <div className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-500 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}


