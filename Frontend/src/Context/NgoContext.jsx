import React, { createContext, useState } from 'react'

export const NgoDataContext=createContext();

const NgoContext = ({children}) => {
  
  const [ngo, setNgo] = useState({
    ownerName:''
  })
 
  return (
      <NgoDataContext.Provider value={{ ngo, setNgo }}>
        {children}
      </NgoDataContext.Provider>
  )
}

export default NgoContext