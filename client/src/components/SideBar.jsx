
import React, { useMemo, Fragment, useEffect, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import ProductList from './ProductList';
import { Link } from 'react-router-dom';
import { FaBars, FaPlus } from 'react-icons/fa'



function SideBar(props) {

 
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(props?.isMobile)
  useEffect(()=>{
    props.setIsMobile(mobileFiltersOpen)
  },[mobileFiltersOpen])
  
  // console.log(mobileFiltersOpen,props.isMobile)
  return (
    <div className="bg-white">
        <div>
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className={`relative z-40 lg:hidden `} onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    {/* <h2 className="text-lg font-medium text-gray-900">Filters</h2> */}
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() =>{ setMobileFiltersOpen(false) }}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4  border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    

                    {props?.section.map((section) => (
                      <Disclosure as="div" key={section.id} className="border border-gray-200 px-4 py-6">
                        {({open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                               
                               <Link to={`${section.link}`}  onClick={() =>{ setMobileFiltersOpen(false) }}> <span className="font-medium text-gray-900">{section.name}</span> </Link>
                                {/* <span className="ml-6 flex items-center">
                                  { !open ? (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span> */}
                              </Disclosure.Button>
                            </h3>
                            {/* <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div key={option.value} className="flex items-center">
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                    //   onClick={()=>{categoryHandler(option.checked,optionIdx,section.id)}}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel> */}
                          </>
                        )}

                        
                      </Disclosure>
                    ))}

                    <Disclosure as="div"className="border border-gray-200 px-4 py-6">
                        {({open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                               
                                <Link to={`/addproduct`}  onClick={() =>{ setMobileFiltersOpen(false) }}> <span className="font-medium text-gray-900"> <div className='flex pr-2 pl-2 items-center border border-gray-500 cursor-pointer'>

<FaPlus className='h-[30px]' />
<div className='ml-1 text-xs xl:text-sm font-bold'>SELL</div>
</div></span> </Link>
                                
                              </Disclosure.Button>
                              
                            </h3>
                            <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                
                            
                            
                          </Disclosure.Button>
                        </h3>
                          
                          </>
                        )}
                        
                      </Disclosure>
                    

                  </form>
                  
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
        </div>
    </div>
  )
}

export default SideBar