import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import Main from '../Components/ImageReview/main'

const ImageReview = () => {
  return (
    <div className='bg-black'>
      <Navbar/>
      <Main/>
      <Footer/>
    </div>
  )
}

export default ImageReview