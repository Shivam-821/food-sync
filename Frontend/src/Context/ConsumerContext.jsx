import React, { createContext, useState } from 'react'

export const ConsumerDataContext=createContext();

const ConsumerContext = ({children}) => {
  
  const [consumer, setConsumer] = useState({
    fullname:''
  })
 
  return (
      <ConsumerDataContext.Provider value={{ consumer, setConsumer }}>
        {children}
      </ConsumerDataContext.Provider>
  )
}

export default ConsumerContext