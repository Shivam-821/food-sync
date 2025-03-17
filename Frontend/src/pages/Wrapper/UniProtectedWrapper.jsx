import React, { useContext, useEffect, useState } from 'react';
import { ConsumerDataContext } from '../../Context/ConsumerContext';
import { ProducerDataContext } from '../../Context/ProducerContext';
import { UpcyclingIDataContext } from '../../Context/UpcyclingIContext';
import { NgoDataContext } from '../../Context/NgoContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingPage from '../../Components/Loading';

const AuthProtectWrapper = ({ children }) => {
    const token = localStorage.getItem('accessToken');
    const navigate = useNavigate();
    
    // Contexts for different user rolesm
    const { setConsumer } = useContext(ConsumerDataContext);
    const { setProducer } = useContext(ProducerDataContext);
    const { updateUpcyclingI } = useContext(UpcyclingIDataContext);
    const { setNgo } = useContext(NgoDataContext);

    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        const roleEndpoints = [
            { type: 'consumer', url: '/api/v1/consumer/profile', setter: setConsumer },
            { type: 'producer', url: '/api/v1/producer/profile', setter: setProducer },
            { type: 'upcyclingIndustry', url: '/api/v1/upcyclingIndustry/profile', setter: updateUpcyclingI },
            { type: 'ngo', url: '/api/v1/ngo/getngoprofile', setter: setNgo }
        ];

        const checkAuthentication = async () => {
            for (const role of roleEndpoints) {
                try {
                    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}${role.url}`, {
                        headers: { Authorization: `Bearer ${token}` },
                        withCredentials: true
                    });

                    if (response.status === 200) {
                        role.setter(response.data);
                        setIsAuthenticated(true);
                        setIsLoading(false);
                        return; // Stop checking once we find a valid profile
                    }
                } catch (error) {
                    console.log(`Failed for ${role.type}:`, error.response?.status || error.message);
                }
            }

            navigate('/login');
        };

        checkAuthentication();
    }, [token, navigate, setConsumer, setProducer, updateUpcyclingI,setNgo]);

    if (isLoading) {
        return <LoadingPage />;
    }

    return isAuthenticated ? <>{children}</> : null;
};

export default AuthProtectWrapper;
