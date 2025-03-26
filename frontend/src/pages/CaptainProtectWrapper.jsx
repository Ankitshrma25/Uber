import React, { useContext, useEffect } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'



const CaptainProtectWrapper = ({
    children
}) => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { captain, setCaptain } = useContext(CaptainDataContext)

    console.log(token)


    useEffect(() => {
        if (!token) {
            navigate('/captain-login')
        }
    }, [token, navigate])


    return token ? <>{children}</> : null
}

export default CaptainProtectWrapper
