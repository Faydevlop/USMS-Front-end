import React from 'react';
import Header from '../components/Header';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Homepage() {
  const { user, error, loading } = useSelector((state) => state.auth);
  const defaultProfileImage = 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png';
  const profileImageUrl = user && user.profileImage ? `http://localhost:8000/${user.profileImage}` : defaultProfileImage;

  return (
    <>
      <Header />
      {/* Hero Section Start */}
      <section id="home" className="py-72 relative">
        <div className="container">
          <div
            className="absolute inset-0 bg-cover bg-no-repeat"
            style={{
              backgroundImage: 'url(assets/images/landing/directory/hero-bg.jpg)',
            }}
          >
            <div className="relative w-full h-full z-30 bg-black/60" />
          </div>
          <div className="relative z-30 flex justify-between items-center">
            <div className="flex-1 max-w-2xl">
              <h2 className="text-6xl font-bold text-white mb-4">
                Welcome {user ? user.name : 'Please login'}
              </h2>
              <div className="lg:flex items-center gap-5 rounded shadow-sm p-3 border bg-white">
                <div className="sm:flex items-center justify-between w-full">
                  <div className="flex w-full items-center border-r border-b sm:border-b-0">
                    <i data-lucide="search" />
                    <input
                      type="text"
                      id="hero-input"
                      name="hero-input"
                      className="border-0 w-full focus:ring-0 bg-transparent"
                      placeholder="What are you searching for?"
                    />
                  </div>
                  <div className="flex w-full items-center ps-4">
                    <i data-lucide="map-pin" />
                    <input
                      type="text"
                      id="hero-input"
                      name="hero-input"
                      className="border-0 w-full focus:ring-0 bg-transparent"
                      placeholder="Location"
                    />
                  </div>
                  <button className="inline-flex items-center px-6 py-3 text-white text-base duration-300 rounded-md bg-gradient-to-r from-red-600 via-red-500 to-red-400">
                    <span className="hidden sm:inline">Search</span>
                    <i className="uil uil-search text-white text-lg ms-2" />
                  </button>
                </div>
              </div>
            </div>
            {user && (
              <div className="flex flex-col items-center mx-16">
                <img
                  src={profileImageUrl}
                  alt="Profile"
                  className="h-48 w-48 object-cover rounded-full border-4 border-white"
                />
              
              <h1 class="text-3xl font-bold text-white mb-2 mt-3">{user.name}</h1>
              <h1 class="text-1xl font-bold text-white mb-4">{user.email}</h1>
                <Link to="/profile">
                  <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                    Profile
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
        {/* Container End */}
      </section>
    </>
  );
}

export default Homepage;
