import React, { useEffect, useState } from 'react'

const UserAddedDonation = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className='font-semibold flex justify-center text-rose-800 font-serif text-5xl'>
      Our Food Donations
      </div>
      <DonationsList/>
    </div>
  )
}

export default UserAddedDonation

const DonationsList = () => {

  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/donation/get-universal-donations`);
        const data = await response.json();
        console.log(response)
        setDonations(data.data || []); // Ensure it's an array
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchDonations();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {donations.map((donation, index) => (
          <div
          key={donation._id}
          className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl border border-gray-200 transition-all duration-200"
        >
          {/* Donor Information */}
          <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-900">{donation.donor.fullname}</h3>
          </div>

          {/* Items List */}
          <div className="border-t border-gray-300 p-4">
            <h4 className="text-lg font-medium text-gray-800 mb-2">Donated Items:</h4>
            <div className="space-y-3">
              {donation.items.map((item) => (
                <div key={item._id} className="flex items-center space-x-3 border-b pb-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded-lg"
                  />
                  <div>
                    <p className="text-gray-800 font-medium">{item.name}</p>
                    <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Credits & Timestamp */}
          <div className="bg-gray-100 px-4 py-3 text-sm text-gray-700 flex justify-between">
            <span>Credits: <strong>{donation.credit}</strong></span>
            <span>{new Date(donation.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
};