import React, { useContext, useEffect, useState } from 'react'
import { ProducerDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const ProducerProtectWrapper = ({
    children
}) => {

    const token = localStorage.getItem('accessToken')
    const navigate = useNavigate()
    const { Producer, setProducer } = useContext(ProducerDataContext)
    const [ isLoading, setIsLoading ] = useState(true)




    useEffect(() => {
        if (!token) {
            navigate('/signup')
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/producer/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                setProducer(response.data.captain)
                setIsLoading(false)
            }
        })
            .catch(err => {

                localStorage.removeItem('token')
                navigate('/signup')
            })
    }, [ token ])

    

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }



    return (
        <>
            {children}
        </>
    )
}

export default ProducerProtectWrapper