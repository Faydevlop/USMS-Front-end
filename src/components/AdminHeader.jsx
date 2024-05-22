import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { adminLogout } from '../features/adminSlice'

function AdminHeader() {
  const dispatch = useDispatch()
  const location = useLocation();
  const isProfilePage = location.pathname === '/admin/dashboard';

  const handleLogout = () =>{
    dispatch(adminLogout())
  }



  return (
    <header id="navbar-sticky" className="navbar nav-light">
    <div className="container">
      <nav>
        {/* Navbar Brand Logo */}
        <a href="home-directory.html" className="logo">
          <img
            src="assets/images/logo-dark.png"
            className="h-10 logo-dark"
            alt="Opixo Logo"
          />
          <img
            src="assets/images/logo-light.png"
            className="h-10 logo-light"
            alt="Opixo Logo"
          />
        </a>
        {/* Mobile Menu Toggle Button (Offcanvas Button) */}
        <div className="lg:hidden flex items-center ms-auto px-2.5">
          <button
            className="hs-collapse-toggle inline-flex items-center justify-center h-9 w-12 rounded-md border border-gray-300 bg-slate-300/30"
            type="button"
            id="hs-unstyled-collapse"
            data-hs-collapse="#mobileMenu"
            data-hs-type="collapse"
          >
            <i className="uil uil-bars text-2xl" />
          </button>
        </div>
        {/* Navigation Menu */}
        <div
          id="mobileMenu"
          className="hs-collapse overflow-hidden transition-all duration-300 lg:basis-auto basis-full grow hidden lg:flex items-center justify-center mx-auto mt-2 lg:mt-0"
        >
          <ul id="navbar-navlist" className="navbar-nav">
            {/* You can uncomment and use these links as needed */}
            {/* <li className="nav-item">
              <a className="nav-link" href="#about">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#features">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#testimonial">
                Testimonials
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#blog">
                Blog
              </a>
            </li> */}
          </ul>
        </div>
        {/* Download Button */}
        <div className="flex items-center space-x-2">
          
          {/* <Link to={'/'}>
            <a className="nav-btn">Home</a>
          </Link> */}
          <a className="nav-btn" onClick={handleLogout} >Log out</a>
          {!isProfilePage ? (
    <Link to={'/admin/dashboard'}>
    <a  className="nav-btn">Home</a></Link>
  ) : (
    ""
  )}
        </div>
      </nav>
    </div>
  </header>
  )
}

export default AdminHeader