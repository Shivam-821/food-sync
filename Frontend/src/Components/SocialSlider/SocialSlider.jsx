import React from 'react'
import social1 from '../../assets/social1.jpeg'
import social2 from '../../assets/social2.jpeg'
import social3 from '../../assets/social3.jpeg'
import social4 from '../../assets/social4.jpeg'
import social5 from '../../assets/social5.jpg'

const SocialSlider = ({heroCount}) => {

      if(heroCount===0){
        return <img src={social1} className='h-[450px]  w-full mt-18  object-cover object-bottom' alt="" />
      } else if(heroCount===1){
        return <img src={social2} className='h-[450px] w-full mt-18 object-cover object-center' alt="" />
      }
      // else if(heroCount===2){
      //   return <img src={social5} className='h-[450px] w-full object-cover object-center' alt="" />
      // } else if(heroCount===3){
      //   return <img src={social4} className='h-[450px] w-full object-cover object-center' alt="" />
   
}

export default SocialSlider