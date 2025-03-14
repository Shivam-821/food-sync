import React, { createContext, useState } from 'react';

export const UpcyclingIDataContext = createContext();

const UpcyclingIContext = ({ children }) => {
    const [upcyclingI, setUpcyclingI] = useState({
        email: '',
        phone: '',
        companyName: '',
        upcyclingMethods: '',
    });
 
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateUpcyclingI = (upcyclingIData) => {
        setUpcyclingI(upcyclingIData);
    };

    const value = {
        upcyclingI,
        setUpcyclingI,
        isLoading,
        setIsLoading,
        error,
        setError,
        updateUpcyclingI
    };

    return (
        <UpcyclingIDataContext.Provider value={value}>
            {children}
        </UpcyclingIDataContext.Provider>
    );
};

export default UpcyclingIContext;
