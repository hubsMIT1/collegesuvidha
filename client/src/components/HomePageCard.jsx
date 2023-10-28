import React from 'react'
import { Link } from 'react-router-dom'

function HomePageCard({title,img,link}) {
  return (
    <div className='max-h-[420px] min-h-[200px] max-w-[400px] bg-white z-30 m-3'>
        
        <div className='text-lg xl:test-xl font-semibold ml-4 mt-4'>{title}</div>
        <div className='h-[300px] m-4'><img className='h-[100%] w-[100%] object-cover' src={img} /></div>
        <div className='text-xs xl:text-sm text-blue-400 ml-4'><Link> {link} </Link></div>
    </div>
  )
}

export default HomePageCard