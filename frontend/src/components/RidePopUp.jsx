import React from 'react'

const RidePopUp = ({ ride, setRidePopupPanel, setConfirmRidePopupPanel, confirmRide }) => {
  return (
    <div>
       <h5 onClick={() => {
                setRidePopupPanel(false)
            }} className='absolute w-[93%] text-center top-2 left-1/2 -translate-x-1/2 '><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>New Ride Available!</h3>
            <div className='flex gap-5 items-center justify-between p-3 border-b-2 mt-4 bg-yellow-400 rounded-lg'>
                <div className='flex gap-3 items-center '>
                    <img className='h-12 w-12 rounded-full object-cover' src="https://scontent.fagr2-1.fna.fbcdn.net/v/t1.6435-9/31959899_536534493461153_2860113581054099456_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=sQZ_Ug_ElIUQ7kNvwFPl653&_nc_oc=Adl3TY38Pe1XuY2OUZ8DwSl5uMtJNJ06Ux8R__z_7r3B7ZLNTwPhd1k43HrkC6v62-k&_nc_zt=23&_nc_ht=scontent.fagr2-1.fna&_nc_gid=k_z-B1_XNgn5om5fNxS5YQ&oh=00_AfHGViLbjuOcoHBya0l3F53U4v2nv08EuOlbqrD1mINTOg&oe=681CB063" alt="" />
                    <h1 className='text-lg font-medium'>{ride?.user.fullname.fristname + " " + ride?.user.fullname.lastname}</h1>
                </div>
                    <h5 className='text-lg front-semibold'>2.2 km</h5>
            </div>
            <div className='flex gap-2 flex-col border-2 border-gray-50 rounded-xl items-center justify-between '>
                
                <div className='w-full mt-5'>
                    <div className='flex gap-5 items-center p-3 border-b-2'>
                        <i className=" text-lg ri-map-pin-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>60/171</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{ride?.pickup}</p>
                        </div>
                    </div>
                    <div className='flex gap-5 items-center p-3 border-b-2'>
                        <i className=" text-lg ri-map-pin-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>60/171</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{ride?.destination}</p>
                        </div>
                    </div>
                    <div className='flex gap-5 items-center p-3' >
                    <i className="text-lg ri-money-rupee-circle-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{ride?.fare}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash</p>
                        </div>
                    </div>
                </div>
               <div className='flex  mt-5 items-center justify-between w-full'> 
               
                <button onClick={() => {
                    setRidePopupPanel(false)
                    
                }} 
                className=' mt-1 bg-gray-300 text-gray-700 p-3 px-10 rounded-lg'>Ignore</button>
                <button onClick={() => {
                   setConfirmRidePopupPanel(true)
                   confirmRide()
                }} 
                className='  bg-green-600 text-white p-3 px-10 rounded-lg'>Accept</button>
               </div>
            </div>
    </div>
  )
}

export default RidePopUp
