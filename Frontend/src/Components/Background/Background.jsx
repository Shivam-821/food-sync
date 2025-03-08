import './Background.css'
import video1 from '../../assets/video1.mp4'
import image1 from '../../assets/a.jpg'
import image2 from '../../assets/b.webp'
import image3 from '../../assets/c.png'

const Background = ({playStatus,heroCount}) => {
  
  if (playStatus){
    return (
      <video className="background fade-in" autoPlay loop muted>
        <source src={video1} type="video/mp4" />
      </video>
    )
  } else if(heroCount===0){
    return <img src={image1} className='background image-container h-screen' alt="" />
  } else if(heroCount===1){
    return <img src={image2} className='background image-container h-screen' alt="" />
  } else if(heroCount===2){
    return <img src={image3} className='background image-container h-screen' alt="" />
  }

}

export default Background