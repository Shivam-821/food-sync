import './Background.css'
import video1 from '../../assets/video1.mp4'
import image1 from '../../assets/a.jpg'
import image2 from '../../assets/b.webp'
import image3 from '../../assets/c.png'
import Spline from '@splinetool/react-spline';

const Background = ({playStatus,heroCount}) => {
  
  if (playStatus){
    return (
      <video className="background fade-in" autoPlay loop muted>
        <source src={video1} type="video/mp4" />
      </video>
    )
  } else{
    return  <div className='h-screen w-full background image-container'><iframe src='https://my.spline.design/3dtextbluecopy-531a30ae1fb64f1f3cd90de876e783a1/' frameBorder='0' width='100%' height='100%'></iframe></div>
  }
  //  else if(heroCount===1){
  //   return <img src={image2} className='background image-container h-screen' alt="" />
  // } else if(heroCount===2){
  //   return <img src={image3} className='background image-container h-screen' alt="" />
  // }

}

export default Background