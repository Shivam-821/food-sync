import React, { useContext, useEffect, useState } from 'react'
import { ConsumerDataContext } from '../../Context/ConsumerContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import LoadingPage from '../../Components/Loading'

// const getTokenFromCookies = () => {
//     return document.cookie
//       .split("; ")
//       .find((row) => row.startsWith("accessToken="))
//       ?.split("=")[1];
//   };

const ConsumerProtectWrapper = ({
    children
}) => {
    const token = localStorage.getItem('accessToken')
    const navigate = useNavigate()
    const { consumer, setConsumer } = useContext(ConsumerDataContext)
    const [ isLoading, setIsLoading ] = useState(true)

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
        axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/consumer/profile`, {
            headers:{
                Authorization: `Bearer ${token}` 
            },
            withCredentials: true 
        }).then(response => {
            if (response.status === 200) {
                setConsumer(response.data)
                setIsLoading(false)
            }
        })
            .catch(err => {
                console.log(err)
                navigate('/login')
            })
    }, [ token ])

    if (isLoading) {
        return (
            <LoadingPage />
        )
    }

    return (
        <>
            {children}
        </>
    )
}

export default ConsumerProtectWrapper