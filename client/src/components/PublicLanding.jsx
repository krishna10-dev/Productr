import React from 'react';
import { useNavigate } from 'react-router-dom';

const PublicLanding = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-2xl">
        {/* Big Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
           <h1 className="text-5xl font-extrabold text-slate-800">Productr</h1>
           <div className="h-4 w-4 bg-orange-500 rounded-full mt-2"></div>
        </div>

        <h2 className="text-2xl text-gray-600 mb-12">
          The most powerful way to manage your product inventory.
        </h2>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button 
            onClick={() => navigate('/login')}
            className="px-10 py-4 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            Login
          </button>
          <button 
            onClick={() => navigate('/signup')}
            className="px-10 py-4 bg-blue-900 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            Sign Up
          </button>
        </div>
      </div>
      
      <p className="mt-16 text-gray-400 text-sm">© 2025 Orufy Technologies. Assignment Project.</p>
    </div>
  );
};

export default PublicLanding;