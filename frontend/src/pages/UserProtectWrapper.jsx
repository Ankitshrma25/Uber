import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSocket } from '../context/SocketContext' // Add this import

const UserProtectWrapper = ({ children }) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { user, setuser } = useContext(UserDataContext)
    const [isLoading, setIsLoading] = useState(true)
    const { sendMessage } = useSocket() // Add this line

    useEffect(() => {
        if (!token) {
            navigate('/user-login')
            return
        }

        const checkProfile = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                
                if (response.status === 200) {
                    setuser(response.data)
                    // Add this: Emit join event after setting user data
                    sendMessage('join', {
                        userId: response.data.user._id,
                        userType: 'user'
                    })
                    setIsLoading(false)
                }
            } catch (err) {
                console.log(err)
                localStorage.removeItem('token')
                navigate('/user-login')
            }
        }

        checkProfile()
    }, [token, navigate, setuser, sendMessage]) // Add sendMessage to dependencies

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    return token ? <>{children}</> : null
}

export default UserProtectWrapper
