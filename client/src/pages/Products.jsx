import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
import EmptyState from '../components/EmptyState';
import ProductCard from '../components/ProductCard';
import AddProductForm from '../components/AddProductForm';
import Header from '../components/Header';

const Products = () => {
 const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // 1. Add Search State
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
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(p => {
      const query = searchQuery.toLowerCase();
      return p.name.toLowerCase().includes(query) || 
             p.category.toLowerCase().includes(query) ||
             p.brand.toLowerCase().includes(query);
  });

  const handleAddNewClick = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  if (loading) return <div className="p-10">Loading...</div>;

return (
    <div className="p-4 w-full h-full bg-slate-50 relative min-h-screen">
      {/* 3. PASS SETTER TO HEADER */}
      <Header onSearch={setSearchQuery} />

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-700">All Products Inventory</h2>
        <button 
          onClick={handleAddNewClick}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition shadow-md"
        >
          + Add Product
        </button>
      </div>

      {/* 4. USE filteredProducts HERE */}
      {products.length === 0 ? (
        <EmptyState onAddClick={handleAddNewClick} />
      ) : (
        <>
          {filteredProducts.length === 0 ? (
             <div className="text-center py-10 text-gray-500">
               No products found matching "{searchQuery}"
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
        </>
      )}

      {/* ... Modal Logic ... */}
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

export default Products;