import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserProtectWrapper = ({ children }) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { user, setuser } = useContext(UserDataContext)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!token) {
            navigate('/user-login')
            return
        }

        // Move the profile check inside useEffect
        const checkProfile = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                
                if (response.status === 200) {
                    setuser(response.data)
                    setIsLoading(false)
                }
            } catch (err) {
                console.log(err)
                localStorage.removeItem('token')
                navigate('/user-login')
            }
        }

        checkProfile()
    }, [token, navigate, setuser])

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    return token ? <>{children}</> : null
}

export default UserProtectWrapper
