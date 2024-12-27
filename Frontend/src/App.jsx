// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import Navbar from '../src/Components/Navbar'
import Home from '../src/Components/Home'
import Footer from '../src/Components/Footer'
import Blogs from '../src/Pages/Blogs'
import About from '../src/Pages/About'
import Contact from '../src/Pages/Contact'
import Login from '../src/Pages/Login'
import Register from '../src/Pages/Register'
import Dashboard from '../src/Pages/Dashboard'

const App = () => {
  const location = useLocation()
  const hidenavbarfooter =["/Login","/Register","/Dashboard"].includes(
    location.pathname
  );

  return (
    <div>
    {!hidenavbarfooter && <Navbar />}
    <Routes >
      <Route exact path="/" element={<Home />} />
      <Route exact path="/blogs" element={<Blogs />} />
      <Route exact path="/about" element={<About />} />
      <Route exact path="/contact" element={<Contact />} />
      <Route exact path="login" element={<Login />} />
      <Route exact path="register" element={<Register />} />
      <Route exact path="dashboard" element={<Dashboard />} />
    </Routes>
    {!hidenavbarfooter && <Footer />}
    </div>
  )
 }

export default App