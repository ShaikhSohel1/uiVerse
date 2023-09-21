"use client"
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/navigation'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function DropDownButton({elements}) {
  const router =useRouter();
  const getvalue = (i) => {
    setSearchElement(i.ElementName)
  }

  return (
    <Menu as="div" className="relative inline-block text-left lg:hidden">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-[#1f2123] px-3 py-2 text-sm font-semibold text-gray-100 shadow-sm hover:bg-slate-900">
          Options
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-slate-900 shadow-lg focus:outline-none text-slate-100">
          <div className="py-1">
            {elements.map((i) => (
      <Menu.Item       key={i}>
      {({ active }) => (
        <div
  
          className="block px-4 py-2 text-sm text-slate-100 hover:bg-slate-700 cursor-pointer"
          onClick={() => router.push(`/browse/${i.ElementName}`)}
        >
          {i.ElementName}
        </div>
      )}
    </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
