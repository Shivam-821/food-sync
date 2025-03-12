import React from 'react'

const Achivements = () => {
  return (
    <div className='mt-15'>
      <div className='font-semibold flex justify-center text-rose-800 font-serif text-5xl'>
        Our Achivements
      </div>
      <DonationsList donations={donationData}/>
      </div>
  )
}

export default Achivements

const DonationsList = ({ donations }) => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {donations.map((donation, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl border border-gray-300 transition-all duration-200 group"
          >
            <img
              src={donation.image}
              alt={donation.ngo}
              className="w-full h-40 object-cover group-hover:scale-102 transition-all duration-200"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-900">
                {donation.ngo}
              </h3>
              <p className="text-gray-600 mt-2">
                <strong>Donor:</strong> {donation.donor}
              </p>
              <p className="text-gray-600 mt-1">
                <strong>Quantity Donated:</strong> {donation.quantity} Kg
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Example usage of the component
const donationData = [
  {
    ngo: "Human Empowerment For Social Integration (HESI)",
    donor: "Utkarsh Singh",
    quantity: 50,
    image: "https://www.hesimanipur.org.in/NewsImage/f13b52e9-7e88-4d58-9070-b4a092ad8035.jpg",
  },
  {
    ngo: "Compassion Children Ministries manipur",
    donor: "Rahul Verma",
    quantity: 30,
    image: "https://i0.wp.com/www.compassionmanipur.com/wp-content/uploads/2015/11/veggi.jpeg?fit=768%2C1024&ssl=1",
  },
  {
    ngo: "Monalisha Society",
    donor: "Vivek Kumar",
    quantity: 75,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6paSYntHeq0O7bkqExM5FC9RyrlF3VZSJ6Q&s",
  },
  {
    ngo: "Serve Smile Foundation (Assam)",
    donor: "Aniket Kumar",
    quantity: 60,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqmPk7Ay8OhPkFL2yWvyF1vlg6tYNFLmFgaQ&s",
  },
  {
    ngo: "Seneh, Bhabada Devi Memorial Philanthropic Trust",
    donor: "Shivam Raj",
    quantity: 55,
    image: "https://cfstatic.give.do/8b969025-edad-4603-bc68-90fa2a9cae73.jpeg",
  },
  {
    ngo: "Barak Valley Welfare Development Society",
    donor: "Anjali Sharma",
    quantity: 10,
    image: "https://way2barak.com/wp-content/uploads/2020/04/donation-780x405.jpg",
  },
];