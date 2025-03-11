import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ConsumerLogout = () => {

  const token = localStorage.getItem('accessToken')
  const navigate = useNavigate()

  axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/consumer/logout`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((response) => {
    if(response.status === 200){
      localStorage.removeItem('accessToken')
      navigate('/signup')
    }
  })

  return (
    <div>UserLogout</div>
  )
}

export default ConsumerLogout