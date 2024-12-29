// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, createContext } from 'react'
import axios from 'axios'
import { use } from 'react'

export const AuthContext= createContext()
export const AuthProvider = ({children}) => {

    const [blogs, setBlogs] = useState()

    useEffect(() => {
        const fetchBlogs = async () => {
            
            try {
                const response = await axios.get("http://localhost:4001/api/blog/my-blogs")
                console.log(response)
                setBlogs(response.data)

            } catch (error) {
                console.log(error)
            }
        }
    },[])

      fetchBlogs();

  return (
    <AuthContext.Provider value= {{blogs}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);

