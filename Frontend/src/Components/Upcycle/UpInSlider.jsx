import React from 'react'

const UpInSlider = () => {
  return (
    <div className='mt-20 ml-5'>
      <div className='font-semibold mb-7 flex justify-center text-rose-800 font-serif text-5xl'>Upcycling Industries</div>
      <ImageScroll />
    </div>
  )
}

export default UpInSlider

const ImageScroll = () => {
  const images = [
    { 
      src: "https://media.licdn.com/dms/image/v2/D560BAQF8aX3IOa3LqQ/company-logo_200_200/company-logo_200_200/0/1712394508007/wastelink__logo?e=2147483647&v=beta&t=J7hX1yc4DFXtT5CS5q-p5HJkzJn-UINZQtywMvfxvgc", name: "Wastelink, Gurugram, India",
      link:"https://wastelink.co/" },
    { 
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2QkjyIeMdk176hBWfU5FQ_gwQnhIgQBPjFA&s", name: "Carbon Masters, Bengaluru, India",
      link:"https://www.carbonlites.com/about.html" },
    { 
      src: "https://app.vevolution.com/images/uploads/2023/02/04/agQxyqPRN34ISlZOfk4V/thumbnail-4NTWRv8X617XX2k5c44C.jpg?1675533193", name: "ÄIO, Estonia",
      link:"https://aio.bio/" },
    { 
      src: "https://pbs.twimg.com/profile_images/1492083164524969984/zsSRLYD0_400x400.jpg", name: "Loopworm, Bengaluru, India",
      link:"https://loopworm.in/" },
    { 
      src: "https://cdn.shopify.com/s/files/1/0566/3929/1542/files/BakeMeHealthy-Full_Square-Small_903.png?v=1682555206", name: "Bake Me Healthy, United States",
      link:"https://bakemehealthy.co/?srsltid=AfmBOopShz07BX7PPU_e0uW2zH1SEDorkGCYzH7xNqJ-yO0tccGIOk5S" },
    
    { 
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6bC_vt6bDTJLQIjrZm2f7i8AQ4Zth4eWiYg&s", name: "Vaayu-Mitra, Pune, India",
      link:"https://vaayu-mitra.com/vaayu-food-waste-management/" },
    { 
      src: "https://images.crunchbase.com/image/upload/c_pad,f_auto,q_auto:eco,dpr_1/v1409366205/yguq2egls1ripu257cqd.jpg", name: "Barnana, United States",
      link:"https://barnana.com/" },
  ];

  return (
    <div className="w-full overflow-x-auto p-4"  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} >
      <div className="flex space-x-4 w-max">
        {images.map((image, index) => (
          <a href={image.link}>
            <div key={index} className="text-center border border-gray-200 rounded-lg p-2 mr-4 flex justicy-center items-center flex-col hover:border-gray-400 transition-all duration-200" >
              <img src={image.src} alt={image.name} className="rounded-lg hover:scale-102 shadow-md w-70 h-60 object-cover transition-all duration-200" />
              <p className="mt-2 text-lg pt-4 text-pretty font-medium">{image.name}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};