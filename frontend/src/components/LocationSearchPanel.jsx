import React from 'react'

const LocationSearchPanel = (props) => {
  console.log(props)

  // sample array for location
  const location = [
    '60/171 kkhwas pura kheria mod, Agra, Uttar Pradesh',
    'B2 Mukundgarh, Jhunjunu, Rajisthan',
    'Raja Balwant Singh Engineering Technical Campus, Bichpuri, Agra, Uttar Pradesh',
    '24B, Jawahar Nagar, Sikar, Rajasthan',
  ]


  return (
    <div >
      {/* This is just sample data */}
      {
        location.map(function(elem){
          return <div onClick={() => props.setVehiclePanel(true)} className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
          <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
          <h4 className='font-medium'>{elem}</h4> 
        </div>
        })
      }

      
      
    </div>
  )
}

export default LocationSearchPanel
