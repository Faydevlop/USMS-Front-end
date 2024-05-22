import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AdminHeader from '../components/AdminHeader';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Adminpage() {
  const { user,token } = useSelector((state) => state.AdminSlice);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);


//   fetching users data
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:8000/admin/dashboard', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUsers(response.data);
      setFilteredUsers(response.data); // Initialize filtered users with all users
    } catch (error) {
      setError(error.response ? error.response.data.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

//   deleting user throug api call
  const handleDelete = async (id) => {
    try {
        await axios.delete(`http://localhost:8000/admin/deleteuser/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        setFilteredUsers(filteredUsers.filter((user) => user._id !== id));
        toast.success('User deleted successfully', {
            position: 'top-right',
            autoClose: 3000, // 3 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        toast.error('Failed to delete user', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
};

// search features
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter users based on the search query
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-10 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please log in to view Admin Dashboard</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to access your profile and enjoy all the features.</p>
          <div className="flex space-x-4">
            <Link to="/admin/login">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                Log In
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    
    <div className="h-full bg-gray-200 p-8 pt-16">
      <AdminHeader />
      <ToastContainer/>
      <div className="bg-white rounded-lg shadow-xl pb-8">
        <div className="w-full h-[250px]">
          <img
            src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg"
            className="w-full h-full rounded-tl-lg rounded-tr-lg"
          />
        </div>
        <div className="flex flex-col items-center -mt-20">
          <div className="flex items-center space-x-2 mt-2">
            <p className="text-2xl text-white">Hello {user ? user.name : ''}</p>
            <span className="bg-blue-500 rounded-full p-1" title="Verified">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-100 h-2.5 w-2.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
              </svg>
            </span>
          </div>
          <p className="text-gray-700">{user ? user.email : ''}</p>
        </div>
        <div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
          <div className="flex items-center space-x-4 mt-2">
            <Link to={'/admin/adduser'}>
              <button className="flex items-center mt-8 bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                </svg>
                <span>Add user</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      <hr />
      <div className="bg-white rounded-lg shadow-xl p-8 mt-3">
        <h4 className="text-xl text-gray-900 font-bold mb-4">Users Listing</h4>
        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search users"
            value={searchQuery}
            onChange={handleSearch}
            className="border border-gray-300 px-3 py-1 rounded-md"
          />
          <button
            onClick={fetchUsers}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500"
          >
            List Users
          </button>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && filteredUsers.length > 0 && (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-gray-100 text-left text-sm font-semibold text-gray-600">Name</th>
                <th className="py-2 px-4 bg-gray-100 text-left text-sm font-semibold text-gray-600">Email</th>
                <th className="py-2 px-4 bg-gray-100 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id} className="border-t">
                  <td className="py-2 px-4 text-gray-900">{user.name}</td>
                  <td className="py-2 px-4 text-gray-500">{user.email}</td>
                  <td className="py-2 px-4">
                  <Link to={`/admin/edituser/${user._id}`}>
                    <button  className="bg-blue-500 text-white py-1 px-3 rounded mr-2">Edit</button>
                    </Link>
                    <button onClick={()=>handleDelete(user._id)}  className="bg-red-500 text-white py-1 px-3 rounded">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Adminpage;
