import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserAddedDonation = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="font-semibold flex justify-center text-rose-800 font-serif text-5xl">
        Our Food Donations
      </div>
      <DonationsList />
    </div>
  );
};
 
export default UserAddedDonation;

const DonationsList = () => {
  const [donations, setDonations] = useState([]);
  const [isDonor, setIsDonor] = useState(null)
  const [isLoading, setIsLoading] = useState(null);
  const navigate = useNavigate();
  
  const token = localStorage.getItem('accessToken')
  //get donor type
  useEffect(() => {
    if (!token) {
        return
    }
    axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/ngo/getngoprofile`, {
        headers:{
            Authorization: `Bearer ${token}` 
        },
        withCredentials: true 
    }).then(response => {
        if (response.status === 200) {
          console.log(response.data)
          setIsDonor(response.data)
            setIsLoading(false)
        }
    })
        .catch(err => {
            console.log(err)
            navigate('/login')
        })
}, [ token ])


//fetch donations from backend
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BASE_URL
          }/api/v1/donation/get-universal-donations`
        );
        console.log("Donation Data:", response.data.data);
        setDonations(response.data.data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchDonations();
  }, []);

  // Function to handle "Get Items" button click
  const handleGetItems = async (donation) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error("No access token found. Please log in again.");
      }
  
      const items = donation.items; // Use the first item's ID
      const quantity = donation.items.length; // Use the first item's quantity
      const donationId = donation._id; // Use the donation ID
      const donorId = donation.donor._id; // Use the donor's ID
  
      // Prepare the request body
      const requestBody = {
        items,
        quantity,
        donationId,
        donorType: donation.donorType, // Assuming the donorType is "NGO"
        donorId, // Use the NGO's ID as the donorId
      };
  
      // Make the request to the backend using POST
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/ngo/requestdonation`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
  
      alert("Donation claimed successfully!");
      navigate('/ngopay')
      // Optionally, refresh the donations list or update the UI
      const updatedDonationsResponse = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/donation/get-universal-donations`
      );
      setDonations(updatedDonationsResponse.data.data || []);
    } catch (err) {
      console.error("Error claiming donation:", err);
      alert("Failed to claim donation. Please try again.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {donations.map((donation) => (
          <div
            key={donation._id}
            className="bg-white flex flex-col shadow-lg rounded-lg overflow-hidden hover:shadow-xl border border-gray-200 transition-all duration-200"
          >
            {/* Donor Information */}
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-900">
                {donation.donor?.fullname || donation.donor?.companyName || "Unknown Donor"}
              </h3>
            </div>

            {/* Items List */}
            <div className="border-t border-gray-300 p-4">
              <h4 className="text-lg font-medium text-gray-800 mb-2">
                Donated Items:
              </h4>
              <div className="space-y-3">
                {donation.items?.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center space-x-3 border-b pb-2"
                  >
                    <img
                      src={item.image} // Use the direct image URL
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded-lg"
                    />
                    <div>
                      <p className="text-gray-800 font-medium">{item.name}</p>
                      <p className="text-gray-600 text-sm">
                        Quantity: {item.quantity} Kg
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Credits & Timestamp */}
            <div className="bg-gray-100 px-4 py-3 text-sm text-gray-700 flex justify-between">
              <span>
                Credits: <strong>{donation.credit}</strong>
              </span>
              <span>
                {donation.createdAt
                  ? new Date(donation.createdAt).toLocaleDateString()
                  : "Unknown Date"}
              </span>
            </div>

            {/* "Get Items" Button */}
            <div className="mt-auto p-4 border-t border-gray-300">
              <button
                onClick={() => handleGetItems(donation)}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                Get Items
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};