import React from 'react'

const LocationSearchPanel = () => {
  return (
    <div >
      {/* This is just sample data */}

      <div className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
        <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
        <h4 className='font-medium'>60/171 kkhwas pura kheria mod, Agra, Uttar Pradesh</h4> 
      </div>
      <div className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
        <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
        <h4 className='font-medium'>B2 Mukundgarh, Jhunjunu, Rajisthan</h4>
      </div>
      <div className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
        <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
        <h4 className='font-medium'>Raja Balwant Singh Engineering Technical Campus, Bichpuri, Agra, Uttar Pradesh</h4>
      </div>
      <div className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
        <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
        <h4 className='font-medium'>24B, Jawahar Nagar, Sikar, Rajasthan</h4>
      </div>
    </div>
  )
}

export default LocationSearchPanel
