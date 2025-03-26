import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'


const CaptainLogin = () => {
  const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { captain, setCaptain } = React.useContext(CaptainDataContext)
    const navigate = useNavigate() // For navigation
    
  
  
  //Function to handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault()
    const captain = {
        email: email,
       password
      }

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain)

      if(response.status === 200){
        const data = response.data
        setCaptain(data.captain)
        localStorage.setItem('token', data.token)
        navigate('/captain-home')
      }
      
      setEmail('')
      setPassword('')
    }
  return (
    <div className='p-7 flex justify-between flex-col w-full h-screen'>
    <div>
      <img className='w-20 mb-2' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="Transparent Image" />
      <form onSubmit={(e) => {
        handleSubmit(e)
      }}>
        <h3 className='text-lg mb-2 font-medium'>What's your email</h3>
        <input
          required
          value={email}
          onChange={
            (e) => {
              setEmail(e.target.value)
          }}
          
          className='bg-[#EDEDED] mb-7 border border-gray-300 rounded-md p-2 w-full px-4 py-2 text-lg placeholder:text-base placeholder:text-gray-400'
          type="email"
          placeholder='email@example.com'
        />
        <h3 className='text-lg mb-2 font-medium'>Enter Password</h3>
        <input
          className='bg-[#EDEDED] mb-7 border border-gray-300 rounded-md p-2 w-full px-4 py-2 text-lg placeholder:text-base placeholder:text-gray-400'
          required 
          value={password}
          onChange={
            (e) => {
              setPassword(e.target.value)
          }}
          type="password"
          placeholder='password' />
        <button
          className='bg-[#111] text-white font-semibold mb-3 rounded-md p-2 w-full px-4 py-2 text-lg placeholder:text-base placeholder:text-gray-400'
          >Login</button>
      </form>
          <p className='text-sm mb-3 text-center'>Join a fleet <Link to='/captain-signup' className='text-blue-600'>Register as Captain</Link></p>
    </div>
    <div>
    <Link to='/user-login'
          className='bg-[#d5622d] text-white flex items-center justify-center font-semibold mb-7 rounded-md p-2 w-full px-4 py-2 text-lg placeholder:text-base placeholder:text-gray-400'
          >Sign in as User</Link>
    </div>
  </div>
  )
}

export default CaptainLogin
