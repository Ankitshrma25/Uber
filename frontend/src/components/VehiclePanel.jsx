import React from 'react'

const VehiclePanel = (props) => {
  return (
    <div>
       <h5 onClick={()=>{
          props.setIsVehiclePanelOpen(false)
        }} className='absolute w-[93%] text-center top-2 left-1/2 -translate-x-1/2 '><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
        <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>
        {/* first vehicle */}
        <div onClick={()=>{
          props.setConfirmRidePanel(true)
        }} 
        className='flex w-full p-1 mb-2 border-2 active:border-black border-gray-50 rounded-xl items-center justify-between '>
          <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_300,w_533/v1646663215/assets/6e/e50c1b-2174-4c97-83a1-bfd4544689d0/original/uberX.png" alt="" />

          <div className='w-1/2 ml-2'>
            <h4 className='font-medium text-base'>UberGo <span><i className="ri-user-fill"></i>4</span></h4>
            <h5>2 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable, compact, and eco-friendly rides</p>
          </div>
          <h2 className='text-lg font-semibold'>₹{props.fares.car}</h2>
        </div>
        {/* second Vehicle */}
        <div onClick={()=>{
          props.setConfirmRidePanel(true)
        }}
        className='flex w-full p-1 mb-2 border-2 active:border-black border-gray-50 rounded-xl items-center justify-between '>
          <img className='h-10' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_768,w_1152/v1649230978/assets/a2/553a18-2f77-4722-a4ba-f736f4cb405e/original/Uber_Moto_Orange_558x372_pixels_Desktop.png" alt="" />

          <div className='w-1/2 ml-2'>
            <h4 className='font-medium text-base'>Moto<span><i className="ri-user-fill"></i>1</span></h4>
            <h5>4 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable, compact, and eco-friendly motercycle rides</p>
          </div>
          <h2 className='text-lg font-semibold'>₹{props.fares.motecycle}</h2>
        </div>
        {/* Third Vehicle */}
        <div onClick={()=>{
          props.setConfirmRidePanel(true)
        }} 
        className='flex w-full p-1 mb-2 border-2 active:border-black border-gray-50 rounded-xl items-center justify-between '>
          <img className='h-10' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_768,w_1152/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />

          <div className='w-1/2 ml-2'>
            <h4 className='font-medium text-base'>Auto<span><i className="ri-user-fill"></i>3</span></h4>
            <h5>5 mins away</h5> 
            <p className='font-normal text-xs text-gray-600'>Affordable Auto rides</p>
          </div>
          <h2 className='text-lg font-semibold'>₹{props.fares.auto}</h2>
        </div>
    </div>
  )
}

export default VehiclePanel
