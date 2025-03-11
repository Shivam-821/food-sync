import React from 'react'

const UpInAchivement = () => {
  return (
    <div className='mt-20 ml-5'>
      <div className='font-semibold flex justify-center text-rose-800 font-serif text-5xl'>Industries Achivement</div>
      <Achivements />
    </div>
  )
}

export default UpInAchivement


const data = [
  {
    image: "https://media.licdn.com/dms/image/v2/D560BAQF8aX3IOa3LqQ/company-logo_200_200/company-logo_200_200/0/1712394508007/wastelink__logo?e=2147483647&v=beta&t=J7hX1yc4DFXtT5CS5q-p5HJkzJn-UINZQtywMvfxvgc",
    name: "WasteLink, Gurugram, India",
    contents: "Wastelink has collected and processed over 4,000 tonnes of food waste, diverting it from landfills and benefiting more than 20,000 animals. This initiative has also conserved over 15,000 liters of water and prevented more than 5,000 tonnes of greenhouse gas emissions.",
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2QkjyIeMdk176hBWfU5FQ_gwQnhIgQBPjFA&s",
    name: "Carbon Masters, Bengaluru, India",
    contents: "Teaming up with Hasiru Dala Innovations, Carbon Masters formed 'Sustainable Impacts', a joint venture to promote circular economy solutions in Bengaluru. They operationalized a 30 tons per day wet waste-to-bio-CNG plant in Harohalli, aiming to revolutionize waste management in the region",
  },
  {
    image: "https://app.vevolution.com/images/uploads/2023/02/04/agQxyqPRN34ISlZOfk4V/thumbnail-4NTWRv8X617XX2k5c44C.jpg?1675533193",
    name: "ÄIO, Estonia",
    contents: "As WFF stated (Living Planet Report (2022), our current food production has resulted in 70% loss of biodiversity on land and 50% loss of biodiversity in fresh waters. We are at a tipping point with overpopulation, overproduction, and exploitation of various natural resources.",
  },
  {
    image: "https://cdn.shopify.com/s/files/1/0566/3929/1542/files/BakeMeHealthy-Full_Square-Small_903.png?v=1682555206",
    name: "Bake Me Healthy, United States",
    contents: "Food waste leads to methane production which is a greenhouse gas contributing to climate change. We believe a healthier planet starts with us. That’s why our baking mixes are mindfully made with upcycled ingredients like blueberry fiber, coffee cherry flour and oatmilk flour. Not only are we saving these from landfills, but we’re also feeding our bodies with super nutritious ingredients. ",
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6bC_vt6bDTJLQIjrZm2f7i8AQ4Zth4eWiYg&s",
    name: "Vaayu-Mitra, Pune, India",
    contents: "Vaayu Mitra had installed approximately 130 biogas units across Maharashtra, collectively processing about one ton of food waste daily.The company has empowered various communities, including housing societies like Avanti Society in Pune, to manage their kitchen waste sustainably. By adopting Vaayu's technology, these societies convert daily kitchen waste into usable cooking gas, promoting environmental responsibility and energy self-sufficiency.",
  },
];

const Achivements = () => {
  return (
    <div className="container mx-auto p-15 space-y-8">
      {data.map((item, index) => (
        <div
          key={index}
          className={`flex flex-col md:flex-row items-center gap-6 pt-3 pb-3 shadow-lg rounded-[80px] border-1  border-gray-200 bg-white ${
            index % 2 === 0 ? "md:flex-row mr-30 pl-20 pr-10" : "pl-10 pr-20  md:flex-row-reverse ml-30"
          }`}
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-40 h-40 object-cover rounded-[40px]"
          />
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold mb-2 ml-3">{item.name}</h2>
            <div className='text-pretty'>{item.contents}</div>
          </div>
        </div>
      ))}
    </div>
  );
};