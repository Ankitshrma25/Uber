import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CapainSignup = () => {

  const navigate = useNavigate()


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [Fisrtname, setFisrtname] = useState('')
  const [Lastname, setLastname] = useState('')
  const [userData, setUserData] = useState({})


  const [vehicleColor, setVehicleColor] = useState('')
  const [plateNumber, setPlateNumber] = useState('')
  const [capacity, setCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')

  
  const { captain, setCaptain } = React.useContext(CaptainDataContext)
  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log('submitted')

try {
    const captainData = {
      fullname: {
        firstname: Fisrtname,
        lastname: Lastname
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plateNumber: plateNumber,
        capacity: capacity,
        vehicleType: vehicleType
      }
    }
    // console.log(userData)
    

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)

    if(response.status === 201){
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      
    

    // clear form only after successful registration
    setEmail('')
    setPassword('')
    setFisrtname('')
    setLastname('')
    setVehicleColor('')
    setPlateNumber('')
    setCapacity('')
    setVehicleType('')
    
    //Navigate after everyhting is set
    navigate('/captain-home')

  
} 
}catch(error) {
  console.error('Registration error:', error.response?.data?.message || error.message)
}
  }


  return (
    <div>
      <div className='p-7 flex justify-between flex-col w-full h-screen'>
        <div>
          <img className='w-20 mb-2' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="Transparent Image" />
          <form onSubmit={(e) => {
            handleSubmit(e)
          }}>
            <h3 className='text-base mb-2 font-medium w-full'>What's our Captain's name</h3>
            <div className='flex justify-between gap-5'>

              <input
                required
                value={Fisrtname}
                onChange={(e)=>{
                  setFisrtname(e.target.value)
                }}
                className='bg-[#EDEDED] mb-6  w-1/2 border border-gray-300 rounded-md p-2  px-4 py-2 text-base placeholder:text-sm placeholder:text-gray-400 '
                type="text"
                placeholder='Fisrtname'
              />
              <input
                required
                value={Lastname}
                onChange={(e)=>{
                  setLastname(e.target.value)
                }}
                className='bg-[#EDEDED] mb-6 w-1/2 border border-gray-300 rounded-md p-2  px-4 py-2 text-base placeholder:text-sm placeholder:text-gray-400'
                type="text"
                placeholder='Lastname'
              />
            </div>
            <h3 className='text-base mb-2 font-medium'>What's our Captain's email</h3>
            <input
              required
              value={email}
                onChange={(e)=>{
                  setEmail(e.target.value)
                }}
              className='bg-[#EDEDED] mb-6 border border-gray-300 rounded-md p-2 w-full px-4 py-2 text-base placeholder:text-sm placeholder:text-gray-400'
              type="email"
              placeholder='email@example.com'
            />
            <h3 className='text-base mb-2 font-medium'>Enter Password</h3>
            <input
              className='bg-[#EDEDED] mb-6 border border-gray-300 rounded-md p-2 w-full px-4 py-2 text-base placeholder:text-sm placeholder:text-gray-400'
              required
              value={password}
                onChange={(e)=>{
                  setPassword(e.target.value)
                }}
              type="password"
              placeholder='password' />
              <h3 className='text-base mb-2 font-medium'>Vehicle Details</h3>
              <input
                required
                value={vehicleColor}
                onChange={(e) => setVehicleColor(e.target.value)}
                className='bg-[#EDEDED] mb-6 border border-gray-300 rounded-md p-2 w-full px-4 py-2 text-base placeholder:text-sm placeholder:text-gray-400'
                type="text"
                placeholder='Vehicle Color'
              />
              <input
                required
                value={plateNumber}
                onChange={(e) => setPlateNumber(e.target.value)}
                className='bg-[#EDEDED] mb-6 border border-gray-300 rounded-md p-2 w-full px-4 py-2 text-base placeholder:text-sm placeholder:text-gray-400'
                type="text"
                placeholder='Plate Number'
              />
              <input
                required
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className='bg-[#EDEDED] mb-6 border border-gray-300 rounded-md p-2 w-full px-4 py-2 text-base placeholder:text-sm placeholder:text-gray-400'
                type="number"
                placeholder='Passenger Capacity'
              />
              <select
                required
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className='bg-[#EDEDED] mb-6 border border-gray-300 rounded-md p-2 w-full px-4 py-2 text-base'
              >
                <option value="">Select Vehicle Type</option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="moto">Moto</option>
              </select>
            <button
              className='bg-[#111] text-white font-semibold mb-3 rounded-md p-2 w-full px-4 py-2 text-base placeholder:text-sm placeholder:text-gray-400'
            >Create Captain Account</button>
          </form>
          <p className='text-sm mb-3 text-center'>Already have an account? <Link to='/captain-login' className='text-blue-600'>Login here</Link></p>
        </div>
        <div>
          <p className='text-[10px] leading-tight'>By proceeding, you consent to get calls, WhatsApp or SMS/RCS messages, including by automated dialer, from Uber and its affiliates to the number provided.</p>
        </div>
      </div>
    </div>
  )
}

export default CapainSignup
