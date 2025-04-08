import React from 'react'

const CaptainDeatils = () => {
  return (
    <div>
      <div className='flex items-center justify-between'>
          <div className='flex items-center justify-between gap-3'>
            <img className='h-10 w-10 rounded-full object-cover' src="https://scontent.fagr2-1.fna.fbcdn.net/v/t1.6435-9/31959899_536534493461153_2860113581054099456_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=sQZ_Ug_ElIUQ7kNvwFPl653&_nc_oc=Adl3TY38Pe1XuY2OUZ8DwSl5uMtJNJ06Ux8R__z_7r3B7ZLNTwPhd1k43HrkC6v62-k&_nc_zt=23&_nc_ht=scontent.fagr2-1.fna&_nc_gid=k_z-B1_XNgn5om5fNxS5YQ&oh=00_AfHGViLbjuOcoHBya0l3F53U4v2nv08EuOlbqrD1mINTOg&oe=681CB063" alt="" />
            <h4 className='text-lg font-medium'>Dhruv Sharma</h4>
          </div>
          <div>
            <h4 className='text-xl font-semibold'>295.20/-</h4>
            <p className='text-sm text-gray-600'>Earned</p>
          </div>
        </div>
        <div className='flex p-3 mt-8 bg-gray-100 rounded-xl justify-center gap-5 items-start'>
          <div className='text-center'>
            <i className="text-3xl mb-2 font-thin ri-timer-2-line"></i>
            <h5 className='text-lg font-medium'>10.3</h5>
            <p className='text-sm text-gray-600'>Hours Online</p>
          </div>
          <div className='text-center'>
            <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i>
            <h5 className='text-lg font-medium'>10.3</h5>
            <p className='text-sm text-gray-600'>Hours Online</p>
          </div>
          <div className='text-center'>
            <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
            <h5 className='text-lg font-medium'>10.3</h5>
            <p className='text-sm text-gray-600'>Hours Online</p>
          </div>
        </div>
    </div>
  )
}

export default CaptainDeatils
