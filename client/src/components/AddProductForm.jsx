import React, { useState, useEffect } from 'react';
import { FiUploadCloud, FiX } from 'react-icons/fi';
import { addProduct, updateProduct } from '../services/api';

// Accept 'existingProduct' prop
const AddProductForm = ({ onClose, onSuccess, existingProduct }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Foods',
    stock: '',
    mrp: '',
    sellingPrice: '',
    brand: '',
    exchange: ''
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 1. POPULATE DATA IF EDITING
  useEffect(() => {
    if (existingProduct) {
      setFormData({
        name: existingProduct.name,
        category: existingProduct.category,
        stock: existingProduct.stock,
        mrp: existingProduct.mrp,
        sellingPrice: existingProduct.sellingPrice,
        brand: existingProduct.brand,
        exchange: existingProduct.exchange
      });
    }
  }, [existingProduct]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('category', formData.category);
      data.append('stock', formData.stock);
      data.append('mrp', formData.mrp);
      data.append('sellingPrice', formData.sellingPrice);
      data.append('brand', formData.brand);
      data.append('exchange',formData.exchange)

      // Append new images if any
      images.forEach((image) => {
        data.append('images', image);
      });

      // 2. DECIDE: ADD OR UPDATE?
      if (existingProduct) {
        await updateProduct(existingProduct._id, data);
        alert('Product Updated!');
      } else {
        await addProduct(data);
        alert('Product Added!');
      }
      
      onSuccess(); 
      onClose();

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full border border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700";
  const labelClass = "block text-sm font-semibold text-gray-600 mt-4";

  return (
    <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden relative max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center p-6 border-b">
        {/* Dynamic Title */}
        <h2 className="text-xl font-bold text-gray-800">
            {existingProduct ? 'Edit Product' : 'Add Product'}
        </h2>
        <button onClick={onClose} className="text-gray-500 hover:text-red-500 text-2xl"><FiX /></button>
      </div>

      <form onSubmit={handleSubmit} className="p-8">
        {error && <p className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">{error}</p>}

        <div><label className={labelClass}>Product Name</label><input type="text" name="name" value={formData.name} required className={inputClass} onChange={handleChange} /></div>
        
        <div>
          <label className={labelClass}>Product Type</label>
          <select name="category" value={formData.category} className={inputClass} onChange={handleChange}>
            <option value="Foods">Foods</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothes">Clothes</option>
            <option value="Beauty Products">Beauty Products</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div><label className={labelClass}>Quantity Stock</label><input type="number" name="stock" value={formData.stock} required className={inputClass} onChange={handleChange} /></div>

        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>MRP</label><input type="number" name="mrp" value={formData.mrp} required className={inputClass} onChange={handleChange} /></div>
          <div><label className={labelClass}>Selling Price</label><input type="number" name="sellingPrice" value={formData.sellingPrice} required className={inputClass} onChange={handleChange} /></div>
        </div>

        <div><label className={labelClass}>Brand Name</label><input type="text" name="brand" value={formData.brand} required className={inputClass} onChange={handleChange} /></div>

        <div className="mt-6">
          <label className={labelClass}>Upload Product Images</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 mt-2 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 cursor-pointer relative">
            <FiUploadCloud className="text-4xl text-blue-400 mb-2" />
            <p className="text-gray-500 text-sm">Click to Browse</p>
            <input type="file" multiple accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleImageChange} />
          </div>
          {/* Show existing images count if editing */}
          {existingProduct && <p className="text-xs text-gray-500 mt-2">Uploading new images will add to the {existingProduct.images.length} existing ones.</p>}
          {images.length > 0 && <p className="text-sm text-green-600 mt-2 text-center">{images.length} new files selected</p>}
        </div>

         <div>
          <label className={labelClass}>Exchange or return eligliblity</label>
          <select name="exchange" value={formData.exchange} className={inputClass} onChange={handleChange}>
            <option value="Yes" className='bg-white'>Yes</option>
            <option value="No" className='bg-white'>No</option>
          </select>
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <button type="button" onClick={onClose} className="px-6 py-3 rounded-lg border border-gray-300">Cancel</button>
          <button type="submit" disabled={loading} className="px-8 py-3 rounded-lg bg-blue-700 text-white font-semibold disabled:bg-blue-300">
            {loading ? 'Saving...' : (existingProduct ? 'Update' : 'Publish')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;