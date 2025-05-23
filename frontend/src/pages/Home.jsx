import React, { useState, useRef, useEffect, useContext } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmedRide from '../components/ConfirmedRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { SocketContext } from '../context/SocketContext'
import { UserDataContext } from '../context/UserDataContext'

const Home = () => {

  const [pickup, setpickup] = useState('')
  const [destination, setdestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const panelRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)

  const panelCloseRef = useRef(null)
  const [isVehiclePanelOpen, setIsVehiclePanelOpen] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [activeField, setActiveField] = useState('') // 'pickup' or 'destination'
  const [fares, setFares] = useState({})
  const [vehicleType, setVehicleType] = useState(null)

  const navigate = useNavigate()

  const { socket } = useContext(SocketContext)
  const { user } = useContext(UserDataContext)

  useEffect(() => {
    // Only emit join event if both socket and user exist
    if (socket && user?._id) {
      socket.emit("join", { 
        userType: "user", 
        userId: user._id 
      });
    }
  }, [socket, user]); // Add user to dependency array

  socket.on('ride-confirmed', ride => {
    setVehicleFound(false)
    setWaitingForDriver(true)
    setRide(ride)
  })

  socket.on('ride-started', ride => {
    console.log("ride")
    setWaitingForDriver(false)
    navigate('/riding', { state: { ride } }) // Updated navigate to include ride data
  })

  const fetchSuggestions = async (query) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/autocomplete?input=${encodeURIComponent(query)}`)
      setSuggestions(response.data)
    } catch (error) {
      console.error('Error fetching suggestions:', error)
      setSuggestions([])
    }
  }

  const handleInputChange = async (e, type) => {
    const value = e.target.value
    
    if (type === 'pickup') {
      setpickup(value)
      setActiveField('pickup')
    } else {
      setdestination(value)
      setActiveField('destination')
    }

    if (value.length > 2) {
      await fetchSuggestions(value)
      setPanelOpen(true)
    } else {
      setSuggestions([])
    }
  }

  const handleSuggestionSelect = (suggestion) => {
    if (activeField === 'pickup') {
      setpickup(suggestion)
    } else {
      setdestination(suggestion)
    }
    setPanelOpen(false)
    setSuggestions([])

    // If both fields are filled, open vehicle panel
    if (pickup && destination) {
      setIsVehiclePanelOpen(true)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()

  }

  useGSAP(function () {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        opacity: 1,
        padding: 24
      })
      gsap.to(panelCloseRef.current, {
        opacity: 1
      })
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        opacity: 0,
        padding: 0

      })
      gsap.to(panelCloseRef.current, {
        opacity: 0
      })
    }
  }, [panelOpen])

  useGSAP(function () {
    if (isVehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)',
      })
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)',
      })
    }
  }, [isVehiclePanelOpen])

  useGSAP(function () {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0)',
      })
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)',
      })
    }
  }, [confirmRidePanel])

  useGSAP(function () {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(0)',
      })
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(100%)',
      })
    }
  }, [vehicleFound])

  useGSAP(function () {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(0)',
      })
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(100%)',
      })
    }
  }, [waitingForDriver])


  async function findTrip() {
    setIsVehiclePanelOpen(true)
    setPanelOpen(false)

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
     params: { pickup, destination },
     headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
     }
    })

    comsole.log(response.data)
  }

  async function createRide(){
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
      pickup,
      destination,
      vehicleType
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    console.log(response.data)
  }


  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      <div className='h-screen w-screen'>
        {/* Image for temporary use  */}
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>
      <div className=' flex flex-col justify-end h-screen absolute top-0 w-full '>
        <div className='h-[30%] p-6 bg-white relative'>
          <h5 ref={panelCloseRef} onClick={() => {
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
                setActiveField('pickup')
              }}
              value={pickup}
              onChange={(e) => handleInputChange(e, 'pickup')}
              className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5'
              type="text"
              placeholder='Add a pickup location'
            />
            <input className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-4'
              onClick={() => {
                setPanelOpen(true)
                setActiveField('destination')
              }}
              value={destination}
              onChange={(e) => handleInputChange(e, 'destination')}
              type="text"
              placeholder='Enter your destination' />
          </form>
          <button onClick={findTrip} // Trip finding function is triggered
          className="bg-black text-white px-4 py-2 rounded-lg mt-4 w-full">
            Find Trip
          </button>
        </div>
        <div ref={panelRef} className=' bg-white h-0 '>
          <LocationSearchPanel
            suggestions={suggestions}
            onSelect={handleSuggestionSelect}
            setPanelOpen={setPanelOpen}
            setIsVehiclePanelOpen={setIsVehiclePanelOpen}
          />
        </div>
      </div>
      <div ref={vehiclePanelRef} className='fixed w-full z-10 translate-y-full bottom-0 px-3 py-10 pt-12 bg-white'>
        <VehiclePanel 
        selectVehicle={setVehicleType}
        fares={fares} setConfirmRidePanel={setConfirmRidePanel} setIsVehiclePanelOpen={setIsVehiclePanelOpen} />
      </div>
      <div ref={confirmRidePanelRef} className='fixed w-full z-10 translate-y-full bottom-0 px-3 py-6 pt-12 bg-white'>
        <ConfirmedRide
          createRide={createRide}
          pickup={pickup} 
          destination={destination} 
          fares={fares}
          vehicleType={vehicleType}
          
          setIsVehiclePanelOpen={setIsVehiclePanelOpen}
          setConfirmRidePanel={setConfirmRidePanel} 
          setVehicleFound={setVehicleFound} />
      </div>
      <div ref={vehicleFoundRef} className='fixed w-full z-10 translate-y-full bottom-0 px-3 py-6 pt-12 bg-white'>
        <LookingForDriver 
        createRide={createRide}
        pickup={pickup} 
        destination={destination} 
        fares={fares}
        vehicleType={vehicleType}
        setVehicleFound={setVehicleFound} />
      </div>
      <div ref={waitingForDriverRef} className='fixed w-full z-10  bottom-0 px-3 py-6 pt-12 bg-white'>
        <WaitingForDriver waitingForDriver={waitingForDriver} />
      </div>

    </div>
  )
}

export default Home
