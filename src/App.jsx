import React from 'react'
import LoginPage from './pages/Loginpage'
import Signinpage from './pages/Signinpage'
import Homepage from './pages/Homepage'
import ProfilePage from './pages/Profilepage'

import Adminlogin from './pages/Adminlogin'
import Adduser from './pages/Adduser'
import Adminpage from './pages/Adminpage'
import Edituser from './pages/Edituser'


import { BrowserRouter, Route, Routes } from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
   <Routes>
    {/* users routs */}

    <Route path='/'  element={<Homepage/>} />
    <Route path='/login'  element={<LoginPage/>} /> 
    <Route path='/signup'  element={<Signinpage/>} />
    <Route path='/Profile'  element={<ProfilePage/>} />

    {/* admin routes */}

    <Route path='/admin/dashboard'  element={<Adminpage/>} />
    <Route path='/admin/login'  element={<Adminlogin/>} />
    <Route path='/admin/adduser'  element={<Adduser/>} />
    <Route path='/admin/edituser/:userIds'  element={<Edituser/>} />


   </Routes>
   </BrowserRouter>
  )
}

export default App