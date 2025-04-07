import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'


import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import Riding from './pages/Riding'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CapainSignup from './pages/CapainSignup'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import { UserDataContext } from './context/UserContext'
import Start from './pages/Start'
import UserProtectWrapper from './pages/UserProtectWrapper'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'

const App = () => {


  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/riding" element={<Riding />} />
        
        <Route path="/user-signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CapainSignup />} />
        <Route path="/home"
          element={
            <UserProtectWrapper>
              <Home />
            </UserProtectWrapper>
          } />

        <Route path='/users/logout'
          element={<UserProtectWrapper>
            <UserLogout />
          </UserProtectWrapper>
          } />
        <Route path='/captain-home' element={
          <CaptainProtectWrapper>
            <CaptainHome />
          </CaptainProtectWrapper>

        } />
      </Routes>
    </div>
  )
}

export default App
