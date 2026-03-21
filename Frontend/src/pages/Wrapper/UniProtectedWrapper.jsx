import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setConsumer } from "../../redux/slices/consumerSlice";
import { setProducer } from "../../redux/slices/producerSlice";
import { updateUpcyclingI } from "../../redux/slices/upcyclingISlice";
import { setNgo } from "../../redux/slices/ngoSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingPage from "../../Components/Loading";

const AuthProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const roleEndpoints = [
      {
        type: "consumer",
        url: "/api/v1/consumer/profile",
        setter: (data) => dispatch(setConsumer(data)),
      },
      {
        type: "producer",
        url: "/api/v1/producer/profile",
        setter: (data) => dispatch(setProducer(data)),
      },
      {
        type: "upcyclingIndustry",
        url: "/api/v1/upcyclingIndustry/profile",
        setter: (data) => dispatch(updateUpcyclingI(data)),
      },
      { type: "ngo", url: "/api/v1/ngo/getngoprofile", setter: (data) => dispatch(setNgo(data)) },
    ];

    const checkAuthentication = async () => {
      for (const role of roleEndpoints) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}${role.url}`,
            {
              headers: { Authorization: `Bearer ${token}` },
              withCredentials: true,
            }
          );

          if (response.status === 200) {
            role.setter(response.data);
            setIsAuthenticated(true);
            setIsLoading(false);
            return; // Stop checking once we find a valid profile
          }
        } catch (error) {
          console.log(
            `Failed for ${role.type}:`,
            error.response?.status || error.message
          );
        }
      }

      navigate("/login");
    };

    checkAuthentication();
  }, [token, navigate, dispatch]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return isAuthenticated ? <>{children}</> : null;
};

export default AuthProtectWrapper;
