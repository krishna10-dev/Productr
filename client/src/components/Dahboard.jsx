import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';     
import EmptyState from './EmptyState';              
import ProductCard from './ProductCard';            
import AddProductForm from './AddProductForm';       
import Header from './Header';                       

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('published'); 
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleAddNewClick = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const filteredProducts = products.filter(p => {
      const status = p.status || 'published';
      return status === activeTab;
  });

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div className="p-8 w-full h-full bg-slate-50 relative min-h-screen">
      <Header />

      {/* TABS SECTION - Only visible here */}
      <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-0">
         <div className="flex gap-8">
            <button 
                onClick={() => setActiveTab('published')}
                className={`pb-4 text-lg font-medium transition-all relative ${
                    activeTab === 'published' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-500 hover:text-gray-700'
                }`}
            >
                Published
            </button>
            <button 
                onClick={() => setActiveTab('unpublished')}
                className={`pb-4 text-lg font-medium transition-all relative ${
                    activeTab === 'unpublished' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-500 hover:text-gray-700'
                }`}
            >
                Unpublished
            </button>
         </div>

         <div className="pb-2">
            <button 
              onClick={handleAddNewClick}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition shadow-md"
            >
              + Add Product
            </button>
         </div>
      </div>

      {products.length === 0 ? (
        <EmptyState onAddClick={handleAddNewClick} />
      ) : (
        <>
            {filteredProducts.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                    No {activeTab} products found.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((p) => (
                    <ProductCard 
                    key={p._id} 
                    product={p} 
                    onDeleteSuccess={loadProducts}
                    onEdit={handleEditClick}
                    onStatusChange={loadProducts} 
                    />
                ))}
                </div>
            )}
        </>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
           <AddProductForm 
             existingProduct={editingProduct}
             onClose={() => setIsModalOpen(false)} 
             onSuccess={loadProducts}
           />
        </div>
      )}
    </div>
  );
};

export default Dashboard;