import './Background.css'
import video1 from '../../assets/video1.mp4'
import food from '../../assets/food-syncHome.png'

const Background = ({playStatus,heroCount}) => {
  
  if (playStatus){
    return (
      <video className="background fade-in" autoPlay loop muted>
        <source src={video1} type="video/mp4" />
      </video>
    )
  } else{
    return <div className='h-screen w-full background image-container'><img src={food} className='w-full min-h-screen'></img></div>
  }
  //  else if(heroCount===1){
  //   return <img src={image2} className='background image-container h-screen' alt="" />
  // } else if(heroCount===2){
  //   return <img src={image3} className='background image-container h-screen' alt="" />
  // }

}

export default Background