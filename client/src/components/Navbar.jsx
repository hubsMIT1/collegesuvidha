import React, { useState } from 'react'
import CS_logo from '../assets/header_logo.png'
import { FaBars, FaPlus } from 'react-icons/fa'
import Search from './Search'
import { Link } from 'react-router-dom'

import { Avatar } from "@material-tailwind/react";

import SideBar from './SideBar'
function Navbar() {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const navHeadings = [
        { name: 'Home', link: '/', type: 'text' },
        { name: 'All Product', link: '/allproducts', type: 'text' }
    ]

    return (
        <header className=''>
            <div className='flex bg-cs-textHdClr text-white h-[60px] justify-between '>
                {/* left */}

                <div className='flex items-center m-4 ml-0'>
                    <Link to={`/`}><img className=' m-1' src={CS_logo} alt='collegesuvidha'/></Link>
                    <Link to={`/`}> <h3 className=' font-bold xs:hidden'> Collegeसुविधा</h3></Link>
                </div>

                {/* middle */}
                <div className='hidden grow relative items-center md:flex lg:flex xl:flex '>
                    <Search />
                </div>

                {/* right */}
                <div className='flex items-center m-4 mr-1'>
                    <div className='hidden items-center m-4 lg:flex xl:flex'>
                        <div className='pr-4 pl-4'>
                            <Link to={`/`}> <div className='text-xs xl:text-sm cursor-pointer'>Home</div></Link>
                        </div>
                        <div className='pr-4 pl-4'>
                            <Link to={`/allproducts`}>  <div className='text-xs xl:text-sm  cursor-pointer'>All Product</div></Link>
                        </div>
                    </div>
                    <div className='pr-4 pl-4'>
                        <Link to={`/dashboard/#profile`}>
                            <div>
                                <Avatar
                                    size="sm"
                                    variant="circular"
                                    alt="shivay"
                                    className=" border-2 border-white "
                                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                                />
                            </div>
                        </Link>

                    </div>
                    <Link to={`/addproduct`} className='flex'>
                        <div className='flex pr-2 pl-2 items-center border border-white cursor-pointer'>

                            <FaPlus className='h-[30px]' />
                            <div className='ml-1 text-xs xl:text-sm font-bold'>SELL</div>
                        </div>
                    </Link>
                    <div className='flex pr-3 pl-3 items-center cursor-pointer lg:hidden xl:hidden' onClick={() => setMobileFiltersOpen(true)} >
                        <FaBars className='h-[48px]' />
                    </div>
                </div>
            </div>
            <div className='flex md:hidden lg:hidden xl:hidden'>
                <Search />
            </div>
            <div className='flex bg-purple-400 text-white space-x-3 text-xs xl:text-sm p-2 pl-6'>
                <Link to={`/seller/1`}>Seller</Link>
                <Link to={`/dashboard/#profile`}>Your Products</Link>
                <Link to={`/dashboard/#chats`}>Chats</Link>
                <Link to={`/signup`}>Sign Up</Link>
            </div>
            {mobileFiltersOpen && <SideBar isMobile={mobileFiltersOpen} setIsMobile={setMobileFiltersOpen} section={navHeadings} />}
        </header>
    )
}

export default Navbar