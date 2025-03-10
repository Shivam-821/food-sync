import React from "react";
import "remixicon/fonts/remixicon.css";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

const ProducerDetail = () => {
  return (
    <div className="bg-gray-100 w-full">
      <Navbar />
      <div className="h-screen flex flex-col  ">
        <div className="h-1/4 w-3/4  flex gap-55 ml-20 rounded-2xl p-5 mt-20 bg-yellow-600">
          <img
            className="h-60  w-60 rounded-full border-2 border-gray-300"
            src="https://imgs.search.brave.com/infROkE3qEnyLfNcO-cEkJfbiXqq4XtSkwzdwsCY_yU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAyMC8w/NS8xNy8yMC8yMS9j/YXQtNTE4MzQyN182/NDAuanBn"
            alt=""
          />
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold mt-5">John Doe</h1>
            <h2 className="font-semibold">@FoodSync Private Limited</h2>
            <div className="flex">
              <h3>
                <i className="ri-map-pin-line font-bold"></i>
              </h3>
              <h3 className="text-gray-800">United States</h3>
            </div>
          </div>
        </div>

        <div className="ml-25 mt-25 flex flex-col gap-6">
          <div className="mr-3">
            <h1 className="font-semiblod text-3xl">Donation</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
              numquam atque natus alias, ut libero sapiente vel fugiat dolores
              sed! Explicabo id culpa maxime quidem ab illum debitis beatae
              autem error expedita dolor, voluptatibus libero odio soluta
              tempora laboriosam aliquid quae alias velit. Fuga vitae nihil unde
              accusamus! Vel, quas!
            </p>
          </div>

          <div>
            <h1 className="font-semiblod text-3xl">Rating</h1>
            <img
              className="w-60 mt-5"
              src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Star_rating_4.5_of_5.png"
              alt=""
            />
          </div>

          <div className="mr-3 pt-5">
            <h1 className="font-semiblod text-3xl">About You</h1>
            <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores deserunt corrupti placeat nesciunt enim itaque esse, quas eligendi qui tempora at laudantium, sapiente fugiat cupiditate cumque. Corporis ullam, iste dolores dolor, minima laboriosam voluptates delectus optio consequuntur nobis illo distinctio ea porro autem, minus adipisci vitae aut quibusdam facilis. Et.
            </p>
          </div>
          
        </div>
       
      </div>

      <div className="ml-25 mt-25 flex flex-col gap-5">
          <h1 className="font-semiblod text-3xl">History</h1>
          <div className="m-5 flex flex-col gap-5">
            <div className="border hover:scale-103 hover:shadow-2xl mr-55 flex justify-between bg-white  border-gray-200 rounded-2xl">
              <img
                className="h-30"
                src="https://www.pngall.com/wp-content/uploads/2016/03/Food-PNG.png"
                alt=""
              />
              <h3 className="mt-15 font-semibold">Burger</h3>
              <h3 className="mt-15 font-semibold">₹3457</h3>
              <h3 className="text-gray-800 mt-15 font-medium mr-5">
                2022-02-20
              </h3>
            </div>

            <div className="border hover:scale-103 hover:shadow-2xl mr-55 flex justify-between bg-white  border-gray-200 rounded-2xl">
              <img
                className="h-30"
                src="https://www.pngall.com/wp-content/uploads/2016/06/Healthy-Food-PNG-Image.png"
                alt=""
              />
              <h3 className="mt-15 font-semibold">vegitables</h3>
              <h3 className="mt-15 font-semibold">₹3457</h3>
              <h3 className="text-gray-800 mt-15 font-medium mr-5">
                2022-02-20
              </h3>
            </div>

            <div className="border hover:scale-103 hover:shadow-2xl mr-55 flex justify-between bg-white  border-gray-200 rounded-2xl">
              <img
                className="h-30"
                src="https://pngimg.com/uploads/chocolate_cake/small/chocolate_cake_PNG62.png"
                alt=""
              />
              <h3 className="mt-15 font-semibold">Chocklet</h3>
              <h3 className="mt-15 font-semibold">₹3457</h3>
              <h3 className="text-gray-800 mt-15 font-medium mr-5">
                2022-02-20
              </h3>
            </div>

            <div className="border hover:scale-103 hover:shadow-2xl mr-55 flex justify-between bg-white  border-gray-200 rounded-2xl">
              <img
                className="h-30"
                src="https://www.pngall.com/wp-content/uploads/2016/03/Food-PNG.png"
                alt=""
              />
              <h3 className="mt-15 font-semibold">Burger</h3>
              <h3 className="mt-15 font-semibold">₹3457</h3>
              <h3 className="text-gray-800 mt-15 font-medium mr-5">
                2022-02-20
              </h3>
            </div>
          </div>
        </div>
        <Footer/>
    </div>
  );
};

export default ProducerDetail;
