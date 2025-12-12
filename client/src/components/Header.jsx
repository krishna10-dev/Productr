import React, { useState } from 'react';
import { FiSearch, FiBell, FiLogOut, FiUser } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const Header = ({ onSearch }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation()

  const getTitle = (path) =>{
    switch(path){
      case '/': return 'Home'
      case '/products': return 'Products'
      default: return ''
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <div className="flex justify-between items-center py-1 mb-2">
      <h1 className="text-2xl font-bold text-gray-800">{getTitle(location.pathname)}</h1>

      <div className="flex items-center gap-6">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          {/* FUNCTIONAL SEARCH INPUT */}
          <input 
            type="text" 
            placeholder="Search Services, Products..." 
            className="pl-10 pr-4 py-2 w-80 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        <div className="relative">
            <div 
                onClick={() => setShowDropdown(!showDropdown)}
                className="h-10 w-10 bg-indigo-900 rounded-full cursor-pointer flex items-center justify-center text-white hover:ring-4 hover:ring-indigo-100 transition"
            >
                <FiUser />
            </div>
            

            {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                    <button 
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 flex items-center gap-2"
                    >
                        <FiLogOut /> Logout
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Header;