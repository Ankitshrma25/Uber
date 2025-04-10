import React from 'react'
import { Link } from 'react-router-dom'


const CaptainRiding = () => {
  return (
    <div className='h-screen'>
    <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
      <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      <Link to='/captain-home' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
        <i className="text-lg font-medium ri-logout-box-r-line"></i>
      </Link>
    </div>
    <div className='h-4/5'>
      <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
    </div>
    <div className='h-1/5 p-6 bg-yellow-400 items-center justify-between'>
     <h4 className='text-2xl font-semibold'>4 km away</h4>
     <button className='  bg-green-600 text-white p-3 px-10 rounded-lg'>Complete Ride</button>
    </div>
    
  </div>
  )
} 

export default CaptainRiding
