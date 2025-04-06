import React from 'react'

const ConfirmedRide = (props) => {
    return (
        <div>
            <h5 onClick={() => {
                props.setIsVehiclePanelOpen(false)
            }} className='absolute w-[93%] text-center top-2 left-1/2 -translate-x-1/2 '><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Confirm Your Ride</h3>

            <div className='flex gap-2 flex-col border-2 active:border-black border-gray-50 rounded-xl items-center justify-between '>
                <img className='h-20' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_300,w_533/v1646663215/assets/6e/e50c1b-2174-4c97-83a1-bfd4544689d0/original/uberX.png" alt="" />
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
                <button className='w-full mt-5 bg-green-600 text-white p-2 rounded-lg'>Confirm</button>
            </div>
        </div>
    )
}

export default ConfirmedRide
