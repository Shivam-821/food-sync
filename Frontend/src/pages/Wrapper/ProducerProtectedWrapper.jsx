import React, { useContext, useEffect, useState } from 'react';
import { ProducerDataContext } from '../../Context/ProducerContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingPage from '../../Components/Loading';

const ProducerProtectWrapper = ({ children }) => {
    const token = localStorage.getItem('accessToken');
    const navigate = useNavigate();
    const { setProducer } = useContext(ProducerDataContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/producer/profile`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        })
        .then(response => {
            if (response.status === 200) {
                setProducer(response.data);
                setIsLoading(false);
            }
        })
        .catch(err => {
            console.log("Producer auth failed:", err);
            navigate('/login');
        });
    }, [token, navigate, setProducer]);

    if (isLoading) return <LoadingPage />;

    return <>{children}</>;
};

export default ProducerProtectWrapper;
