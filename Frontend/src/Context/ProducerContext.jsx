import React, { createContext, useState } from 'react';

export const ProducerDataContext = createContext();

const ProducerContext = ({ children }) => {
    const [producer, setProducer] = useState({
        fullname: '',
        email: '',
        phone: '',
        companyName: '',
        items: [],
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateProducer = (producerData) => {
        setProducer(producerData);
    };

    const value = {
        producer,
        setProducer,
        isLoading,
        setIsLoading,
        error,
        setError,
        updateProducer
    };

    return (
        <ProducerDataContext.Provider value={value}>
            {children}
        </ProducerDataContext.Provider>
    );
};

export default ProducerContext;
