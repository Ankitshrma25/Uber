import React, { useContext, useEffect, useState } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'



const CaptainProtectWrapper = ({
    children
}) => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { captain, setCaptain } = useContext(CaptainDataContext)
    const [ isLoading, setIsLoading ] = useState(true)

    


    useEffect(() => {
        if (!token) {
            navigate('/captain-login')
        }
    }, [token, navigate])

    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, { 
        headers: { 
            Authorization: `Bearer ${token}` 
        } 
    }).then(Response => {
        if(Response.status === 200){
            const data = Response.data
            setCaptain(data.captain)
            setIsLoading(false)
        }
    })
        .catch(err => {
            console.log(err)
            localStorage.removeItem('token')
            navigate('/captain-login')
        })

    if(isLoading){
        return <h1>Loading...</h1>
    }


    return token ? <>{children}</> : null
}

export default CaptainProtectWrapper
