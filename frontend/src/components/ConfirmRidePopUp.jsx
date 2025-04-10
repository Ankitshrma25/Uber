import React from 'react'
import { Link } from 'react-router-dom'

const ConfirmRidePopUp = (props) => {
  return (
     <div>
       <h5 onClick={() => {
                props.setRidePopupPanel(false)
            }} className='absolute w-[93%] text-center top-2 left-1/2 -translate-x-1/2 '><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Confirm This to Start !</h3>
            <div className='flex gap-5 items-center justify-between p-3 border-b-2 mt-4 bg-yellow-400 rounded-lg'>
                <div className='flex gap-3 items-center '>
                    <img className='h-12 w-12 rounded-full object-cover' src="https://scontent.fagr2-1.fna.fbcdn.net/v/t1.6435-9/31959899_536534493461153_2860113581054099456_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=sQZ_Ug_ElIUQ7kNvwFPl653&_nc_oc=Adl3TY38Pe1XuY2OUZ8DwSl5uMtJNJ06Ux8R__z_7r3B7ZLNTwPhd1k43HrkC6v62-k&_nc_zt=23&_nc_ht=scontent.fagr2-1.fna&_nc_gid=k_z-B1_XNgn5om5fNxS5YQ&oh=00_AfHGViLbjuOcoHBya0l3F53U4v2nv08EuOlbqrD1mINTOg&oe=681CB063" alt="" />
                    <h1 className='text-lg font-medium'>Dhruv Sharma</h1>
                </div>
                    <h5 className='text-lg front-semibold'>2.2 km</h5>
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
                <Link to='/captain-riding' className='flex items-center justify-center w-full mt-5 bg-green-600 text-white p-3 rounded-lg'>Confirm</Link>
                <button onClick={() => {
                    props.setConfirmRidePopupPanel(false)
                    props.setRidePopupPanel(false)
                    
                }} 
                className='w-full mt-1 bg-red-600 text-white p-3 rounded-lg'>Cancel </button>
            </div>
    </div>
  )
}

export default ConfirmRidePopUp
   