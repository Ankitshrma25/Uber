import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'


import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CapainSignup from './pages/CapainSignup'
import { UserDataContext } from './context/UserContext'
import Start from './pages/Start'

const App = () => {


  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CapainSignup />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
