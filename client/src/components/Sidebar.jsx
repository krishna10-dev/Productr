// import React from 'react';
import { Link, useLocation} from 'react-router-dom';
import { FiHome, FiShoppingBag, FiSearch } from 'react-icons/fi';

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'text-white' : 'text-gray-400 hover:text-white';
  };

  return (
    <div className="h-screen w-64 bg-slate-900 fixed left-0 top-0 flex flex-col p-4 text-white">
      <div className="flex items-center gap-2 mb-4">
        <h1 className="text-2xl font-bold tracking-tight">Productr</h1>
        <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
      </div>


      {/* Not functional searchbar in sidebar */}
      <div className="relative mb-12 border-b pb-5 border-gray-600">
                <FiSearch className="relative left-3 top-1/2 transform text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search" 
                  className="pl-10 pr-4 py-2 w-full bg-[#2C384E] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

      <nav className="flex flex-col gap-6 ">
        {/* Link to Home (Filtered View) */}
        <Link to="/" className={`flex items-center gap-3 text-lg font-medium transition-colors ${isActive('/')}`}
        >
          <FiHome /> Home
        </Link>
        
        {/* Link to Products (Master View) */}
        <Link to="/products" className={`flex items-center gap-3 text-lg font-medium transition-colors ${isActive('/products')}`}>
          <FiShoppingBag /> Products
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;