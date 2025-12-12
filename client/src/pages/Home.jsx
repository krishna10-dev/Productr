import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
import EmptyState from '../components/EmptyState';
import ProductCard from '../components/ProductCard';
import AddProductForm from '../components/AddProductForm';
import Header from '../components/Header';

const Home = () => {
 const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('published'); 
  const [searchQuery, setSearchQuery] = useState(''); 
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

const filteredProducts = products.filter(p => {

      const status = p.status || 'published';
      const matchesStatus = status === activeTab;

      const query = searchQuery.toLowerCase();
      const matchesSearch = p.name.toLowerCase().includes(query) || 
                            p.category.toLowerCase().includes(query);

      return matchesStatus && matchesSearch;
  });

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div className="p-4 w-full h-full bg-slate-50 relative min-h-screen">
  
      <Header onSearch={setSearchQuery} />
   
      <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-0">
    
             <div className="flex gap-8">
            <button 
                onClick={() => setActiveTab('published')}
                className={`pb-4 text-lg font-medium transition-all ${activeTab === 'published' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-500'}`}
            >
                Published
            </button>
            <button 
                onClick={() => setActiveTab('unpublished')}
                className={`pb-4 text-lg font-medium transition-all ${activeTab === 'unpublished' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-500'}`}
            >
                Unpublished
            </button>
         </div>
      </div>

       {filteredProducts.length === 0 ? (
         <div className="text-center py-20 text-gray-500">
             No {activeTab} products found matching "{searchQuery}".
         </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((p) => (
             <ProductCard 
               key={p._id} 
               product={p} 
               onDeleteSuccess={loadProducts} // Ensure this is defined
               onEdit={(prod) => { setEditingProduct(prod); setIsModalOpen(true); }}
               onStatusChange={loadProducts} 
             />
          ))}
        </div>
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

export default Home;