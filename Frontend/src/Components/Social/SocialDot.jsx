import React from 'react'

const SocialDot = ({setHeroCount,heroCount}) => {
  return (
    <div>
        <div className='hero-dot-play  w-full'>
        <ul className='hero-dots relative -mt-30 w-full flex justify-center'>
          <li onClick={()=>setHeroCount(0)} className={heroCount===0 ? 'hero-dot orange' : 'hero-dot'} ></li>
          <li onClick={()=>setHeroCount(1)} className={heroCount===1 ? 'hero-dot orange' : 'hero-dot'} ></li>
        </ul>
      </div>
    </div>
  )
}

export default SocialDot