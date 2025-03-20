import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const CapainSignup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [Fisrtname, setFisrtname] = useState('')
  const [Lastname, setLastname] = useState('')
  const [userData, setUserData] = useState({})


  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('submitted')
    setUserData({
      Fisrtname: Fisrtname,
      Lastname: Lastname,
      email: email,
      password: password
    })
    console.log(userData)
    setEmail('')
    setPassword('')
    setFisrtname('')
    setLastname('')

  }

  return (
    <div>
      <div className='p-7 flex justify-between flex-col w-full h-screen'>
        <div>
          <img className='w-20 mb-2' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Transparent Image" />
          <form onSubmit={(e) => {
            handleSubmit(e)
          }}>
            <h3 className='text-base mb-2 font-medium'>What's your name</h3>
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
            <h3 className='text-base mb-2 font-medium'>What's your email</h3>
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
            <button
              className='bg-[#111] text-white font-semibold mb-3 rounded-md p-2 w-full px-4 py-2 text-base placeholder:text-sm placeholder:text-gray-400'
            >Login</button>
          </form>
          <p className='text-sm mb-3 text-center'>Already have an account? <Link to='/user-login' className='text-blue-600'>Login here</Link></p>
        </div>
        <div>
          <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='text-blue-600 underline'>Google</span> Privacy Policy and <span className='text-blue-600 underline'>Terms of Service</span>Google Privacy Policy and Terms of Service apply.</p>
        </div>
      </div>
    </div>
  )
}

export default CapainSignup
