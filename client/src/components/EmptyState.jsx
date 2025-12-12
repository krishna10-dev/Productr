import React from 'react';
import { FiPlusSquare } from 'react-icons/fi';

const EmptyState = ({ onAddClick }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <div className="bg-blue-50 p-6 rounded-2xl mb-6">
        <FiPlusSquare className="text-6xl text-blue-900" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Feels a little empty over here...</h2>
      <p className="text-gray-500 mb-8 max-w-md">
        You can create products without connecting store you can add products to store anytime
      </p>
      <button 
        onClick={onAddClick}
        className="bg-accent text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition-all"
      >
        Add your Products
      </button>
    </div>
  );
};

export default EmptyState;