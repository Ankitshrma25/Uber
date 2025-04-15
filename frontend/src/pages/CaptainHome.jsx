import React from 'react'
import { Link } from 'react-router-dom'
import CaptainDeatils from '../components/CAptainDeatils'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import RidePopUp from '../components/RidePopUp'
import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainContext'
import { useContext } from 'react'





// import CaptainDetails from '../components/CaptainDetails'

function CaptainHome() {

  const [ridePopupPanel, setRidePopupPanel] = useState(false)
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)
  const locationIntervalRef = useRef(null) // Add this line

  const confirmridePopupPanelRef = useRef(null)
  const ridePopupPanelRef = useRef(null)
  const [ ride, setRide ] = useState(null)

  const { socket } = useContext(SocketContext)
  const { captain } = useContext(CaptainDataContext)

  useEffect(() => {
    if (!socket || !captain?._id) return;

    socket.emit('join', {
      userId: captain._id,
      userType: 'captain'
    })

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {

          // console.log({userId: captain._id,
          //   location: {
          //     ltd: position.coords.latitude,
          //     lng: position.coords.longitude}
          //   }
          // )

          socket.emit('update-location-captain', {
            userId: captain._id,
           location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
          })
        })
      }
    }

    // Initial location update
    updateLocation()

    // Set up interval for periodic updates
    locationIntervalRef.current = setInterval(updateLocation, 10000)

    // Cleanup function
    return () => {
      if (locationIntervalRef.current) {
        clearInterval(locationIntervalRef.current)
      }
    }
  }, [socket, captain]) // Add dependencies


  socket.on('new-ride', (data) => {
    console.log(data)
  })

  useGSAP(function () {
      if (ridePopupPanel) {
        gsap.to(ridePopupPanelRef.current, {
          transform: 'translateY(0)',
        })
      } else {
        gsap.to(ridePopupPanelRef.current, {
          transform: 'translateY(100%)',
        })
      }
    }, [ridePopupPanel])

    useGSAP(function () {
      if (confirmRidePopupPanel) {
        gsap.to(confirmridePopupPanelRef.current, {
          transform: 'translateY(0)',
        })
      } else {
        gsap.to(confirmridePopupPanelRef.current, {
          transform: 'translateY(100%)',
        })
      }
    }, [confirmRidePopupPanel])

  return (
    <div className='h-screen'>
      <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
        <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <Link className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className='h-3/5'>
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>
      <div className='h-2/5 p-6'>
        <CaptainDeatils />
      </div>
      <div ref={ridePopupPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full px-3 py-10 pt-12 bg-white'>
        <RidePopUp
          ride={ride}
         setRidePopupPanel={setRidePopupPanel} 
         setConfirmRidePopupPanel={setConfirmRidePopupPanel}/>
      </div>
      <div ref={confirmridePopupPanelRef} className='fixed w-full h-screen z-10 bottom-0 translate-y-full px-3 py-10 pt-12 bg-white'>
        <ConfirmRidePopUp setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel} />
      </div>
    </div>
  )
}

export default CaptainHome
