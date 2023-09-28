import React from 'react'
import {FaSearch} from 'react-icons/fa'
function Search() {
  return (
    <div className='w-[100%]'>
        <div className='flex items-center h-10 bg-purple-400 rounded' type="text"> 
            <select className='p-2 bg-gray-300 text-black border text-xs xl:text-sm'>
                <option value="">All</option>
                <option value="">Cycle</option>
                <option value="">Mattress</option>
                <option value="">Kettle</option>
                <option value="">Lab Dress</option>
                <option value="">Lab Shoes</option>
                <option value="">Calculator</option>

            </select>
            <input className='flex grow items-center h-[100%] rounded-l text-black' type='text' />
            <button className='w-[45px]'>
                <FaSearch className='h-[27px] m-auto stroke-slate-900' />
            </button>
        </div>
    </div>
  )
}

export default Search