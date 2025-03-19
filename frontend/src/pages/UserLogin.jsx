import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const UserLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState({})


//Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    setUserData({
      email: email,
      password: password
    })
    console.log(userData) 
    setEmail('')
    setPassword('')
  }

  return (
    <div className='p-7 flex justify-between flex-col w-full h-screen'>
      <div>
        <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Transparent Image" />
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
            <p className='text-sm mb-3 text-center'>New here? <Link to='/user-signup' className='text-blue-600'>Create an account</Link></p>
      </div>
      <div>
      <Link to='/captain-login'
            className='bg-[#10b461] text-white flex items-center justify-center font-semibold mb-7 rounded-md p-2 w-full px-4 py-2 text-lg placeholder:text-base placeholder:text-gray-400'
            >Sign in as Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin
