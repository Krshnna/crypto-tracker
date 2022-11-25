import React, { createContext, useContext, useEffect, useState } from 'react'

const Cryto = createContext() 


const CrytoContext = ({children}) => {

  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");


  useEffect(() => {
    if(currency === "INR") setSymbol("₹");
    else if(currency === "USD") setSymbol("$");
  }, [currency]);
  

  return (
    <Cryto.Provider value={{
      currency, setCurrency, symbol, setSymbol
    }}>
        {children}
    </Cryto.Provider>
  )
}

export default CrytoContext;

export const CrytoState = () => {
    return useContext(Cryto);
}