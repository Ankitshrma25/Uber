import React, { useState, useRef } from 'react'
import {useGSAP} from '@gsap/react'
import { gsap } from 'gsap'
import 'remixicon/fonts/remixicon.css'


const Home = () => {

  const [pickup, setpickup] = useState('')
  const [destination, setdestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)

  const submitHandler = (e) => {
      e.preventDefault()

  }

  useGSAP(function () {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        opacity: 1
      })
      gsap.to(panelCloseRef.current, {
        opacity: 1
      })
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        opacity: 0
      })
      gsap.to(panelCloseRef.current, {
        opacity: 0
      })
    }
  }, [panelOpen])

  return (
    <div className='h-screen relative'>
      <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      <div className='h-screen w-screen'>
        {/* Image for temporary use  */}
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>
      <div className=' flex flex-col justify-end h-screen absolute top-0 w-full '>
        <div className='h-[30%] p-6 bg-white relative'>
          <h5 ref={panelCloseRef} onClick={()=>{
            setPanelOpen(false)
            }} className='absolute opacity-0 te top-2 left-1/2 -translate-x-1/2'>
          <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <form onSubmit={(e) => {
            submitHandler(e)
          }}>
            <div className='line absolute h-16 w-1 top-[45%] left-10 bg-gray-900 rounded-full'></div>
            <input 
            onClick={() => {
              setPanelOpen(true)
            }}
            value={pickup}
            onChange={(e) => {
              setpickup(e.target.value)
            }}
            className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5' 
            type="text" 
            placeholder='Add a pickup location' 
            />
            <input className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-4' 
            onClick={() => {
              setPanelOpen(true)
            }}
            value={destination}
            onChange={(e) => {
              setdestination(e.target.value)
            }}
            type="text" 
            placeholder='Enter your destination' />
          </form>
        </div>
        <div ref={panelRef} className=' bg-red-500 h-0 opacity-0 '>

        </div>
      </div>
    </div>
  )
}

export default Home
