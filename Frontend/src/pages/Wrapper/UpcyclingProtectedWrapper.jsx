import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUpcyclingI } from '../../redux/slices/upcyclingISlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingPage from '../../Components/Loading';

const UpcyclingProtectWrapper = ({ children }) => {
    const token = localStorage.getItem('accessToken');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            navigate('/signup');
            return;
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/upcyclingIndustry/profile`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        })
        .then(response => {
            if (response.status === 200) {
                dispatch(setUpcyclingI(response.data));
                setIsLoading(false);
            }
        })
        .catch(err => {
            console.log("Upcycling Industry auth failed:", err);
            navigate('/signup');
        });
    }, [token, navigate, dispatch]);

    if (isLoading) return <LoadingPage />;

    return <>{children}</>;
};

export default UpcyclingProtectWrapper;
