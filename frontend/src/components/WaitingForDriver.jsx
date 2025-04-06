import React from 'react'

const WaitingForDriver = () => {
  return (
    <div>
    <h5 onClick={() => {
        props.setIsVehiclePanelOpen(false)
    }} className='absolute w-[93%] text-center top-2 left-1/2 -translate-x-1/2 '><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
    
    <div className='flex items-center justify-between mb-5'>
    <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_300,w_533/v1646663215/assets/6e/e50c1b-2174-4c97-83a1-bfd4544689d0/original/uberX.png" alt="" />
    <div className='text-right'>
      <h2 className='text-lg font-medium'>Ankit</h2>
      <h4 className='text-ex font-semibold -mt-1 -mb-1'>UP 80 AM 1710</h4>
      <p className='text-sm text-gray-600'>Rangerover</p>
    </div>
    </div>

    <div className='flex gap-2 flex-col border-2 border-gray-50 rounded-xl items-center justify-between '>
        
        <div className='w-full mt-5'>
            <div className='flex gap-5 items-center p-3 border-b-2'>
                <i className=" text-lg ri-map-pin-fill"></i>
                <div>
                    <h3 className='text-lg font-medium'>60/171</h3>
                    <p className='text-sm -mt-1 text-gray-600'>Khwas Pura Kheria Mod, Agra, Uttar Pradesh</p>
                </div>
            </div>
            <div className='flex gap-5 items-center p-3 border-b-2'>
                <i className=" text-lg ri-map-pin-fill"></i>
                <div>
                    <h3 className='text-lg font-medium'>60/171</h3>
                    <p className='text-sm -mt-1 text-gray-600'>Khwas Pura Kheria Mod, Agra, Uttar Pradesh</p>
                </div>
            </div>
            <div className='flex gap-5 items-center p-3' >
                <i className="text-lg ri-money-rupee-circle-line"></i>
                <div>
                    <h3 className='text-lg font-medium'>₹193.20</h3>
                    <p className='text-sm -mt-1 text-gray-600'>Cash</p>
                </div>
            </div>
        </div>

    </div>
</div>
  )
}

export default WaitingForDriver
