import { createContext,useState } from "react";

export const CatContext=createContext()


function AppProvider({children})
{
   const [category,setCategory]=useState([])

   return(

    <CatContext.Provider value={{ category,setCategory }}>
{children}

    </CatContext.Provider>

   )
 



}

export default AppProvider;