import React from "react";
import f1 from "../../assets/f1.jpg";
import f2 from "../../assets/f2.jpg";
import f3 from "../../assets/f3.jpg";
import f4 from "../../assets/f4.jpg";
import f5 from "../../assets/f4.jpg";
import f6 from "../../assets/f1.jpg";

const UpProducts = () => {
  return (
    <div className="mt-20 ml-5">
      <div className="font-semibold mb-7 flex justify-center font-serif text-amber-900 text-5xl">
        Expired Foods
      </div>
      <Products />
    </div>
  );
};

export default UpProducts;

const Products = () => {
  const images = [
    {
      src: "https://hips.hearstapps.com/hmg-prod/images/gettyimages-691091261-1657831829.jpg?crop=0.895xw:0.716xh;0.0579xw,0.281xh&resize=640:*",
      name: "Berries",
      content: "This is a description of image 1",
      price: "₹200",
      quantity: "5kg for 20 Person",
    },
    {
      src: "https://hips.hearstapps.com/hmg-prod/images/gettyimages-1657830988.jpg?crop=1xw:0.6666666666666666xh;center,top&resize=980:*",
      name: "Head Lettuce and Cabbage",
      content: "This is a description of image 1",
      price: "₹250",
      quantity: "4kg for 15 Person",
    },
    {
      src: "https://hips.hearstapps.com/hmg-prod/images/gettyimages-699098461-1657830210.jpg?crop=1.00xw:0.653xh;0,0.267xh&resize=980:*",
      name: "Cream Cheese",
      content: "This is a description of image 1",
      price: "₹180",
      quantity: "6kg for 25 Person",
    },
    {
      src: "https://hips.hearstapps.com/hmg-prod/images/gettyimages-86056132-1657830638.jpg?crop=1.00xw:0.808xh;0,0.0501xh&resize=980:*",
      name: "Cooking Oil",
      content: "This is a description of image 1",
      price: "₹220",
      quantity: "3kg for 10 Person",
    },
    {
      src: "https://hips.hearstapps.com/hmg-prod/images/gettyimages-1657831118.jpg?crop=0.5725524475524476xw:1xh;center,top&resize=980:*",
      name: "Prepackaged Lettuce",
      content: "This is a description of image 1",
      price: "₹300",
      quantity: "7kg for 30 Person",
    },
    {
      src: "https://hips.hearstapps.com/hmg-prod/images/gettyimages-1657832771.jpg?crop=1.00xw:1.00xh;0,0&resize=980:*",
      name: "Sausage",
      content: "This is a description of image 1",
      price: "₹275",
      quantity: "5.5kg for 22 Person",
    },
    {
      src: "https://hips.hearstapps.com/hmg-prod/images/gettyimages-85652782-1657831510.jpg?crop=1.00xw:0.665xh;0,0.120xh&resize=980:*",
      name: "Mustard 7",
      content: "This is a description of image 1",
      price: "₹190",
      quantity: "4.5kg for 18 Person",
    },
    {
      src: "https://hips.hearstapps.com/hmg-prod/images/gettyimages-938938606-1657831707.jpg?crop=0.6677678150070788xw:1xh;center,top&resize=980:*",
      name: "Ketchup",
      content: "This is a description of image 1",
      price: "₹210",
      quantity: "3.5kg for 12 Person",
    },
    {
      src: "https://hips.hearstapps.com/hmg-prod/images/gettyimages-86056662-1657833649.jpg?crop=1.00xw:0.784xh;0,0.0332xh&resize=980:*",
      name: "Peanut Butter",
      content: "This is a description of image 1",
      price: "₹210",
      quantity: "3.5kg for 12 Person",
    },
    {
      src: "https://hips.hearstapps.com/hmg-prod/images/gettyimages-478896232-chicken-vichailao-1470871004.jpg?resize=980:*",
      name: "Fresh Meat",
      content: "This is a description of image 1",
      price: "₹210",
      quantity: "3.5kg for 12 Person",
    },
  ];

  return (
    <div>
      <div className="ml-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {images.map((image, index) => (
          <div className="w-sm p-4 border-2 border-gray-200 rounded-lg hover:shadow-lg hover:border-gray-300 hover:transition-transform hover:duration-500 ">
            <img
              className="w-full h-65 object-cover rounded-lg hover:scale-102 transition-all duration-200"
              src={image.src}
              alt="Image 1"
            />
            <div>
              <h2 className="text-lg font-bold mt-4">{image.name}</h2>
              <p className="text-sm text-gray-600">
                This is a description of image 1
              </p>
              <div className="flex justify-between">
                <div>{image.price}</div>
                <div>{image.quantity}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
