import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setProducer } from '../../redux/slices/producerSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingPage from '../../Components/Loading';

const ProducerProtectWrapper = ({ children }) => {
    const token = localStorage.getItem('accessToken');
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
                dispatch(setProducer(response.data));
                setIsLoading(false);
            }
        })
        .catch(err => {
            console.log("Producer auth failed:", err);
            navigate('/login');
        });
    }, [token, navigate, dispatch]);

    if (isLoading) return <LoadingPage />;

    return <>{children}</>;
};

export default ProducerProtectWrapper;
