// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, createContext } from 'react'
import axios from 'axios'

export const AuthContext = createContext()
export const AuthProvider = ({children}) => {

    const [blogs, setBlogs] = useState()

    useEffect(() => {
        const fetchBlogs = async () => {
            
            try {
                const response = await axios.get("")
                

            } catch (error) {
                console.log(error)
            }
        }
    },[])


  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  )
}
