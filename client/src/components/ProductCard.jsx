import React, { useState } from "react";
import {
  FiTrash2,
  FiEdit2,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { deleteProduct, updateProduct } from "../services/api";
import DeleteProduct from "./DeleteProduct";

const ProductCard = ({ product, onDeleteSuccess, onEdit, onStatusChange }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const images =
    product.images.length > 0
      ? product.images.map((img) => `http://localhost:5000${img}`)
      : ["https://via.placeholder.com/300"];

  const currentImageUrl = images[currentImageIndex];

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToImage = (index, e) => {
    e.stopPropagation();
    setCurrentImageIndex(index);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true); 
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteProduct(product._id); 
      setShowDeleteModal(false); 
      if (onDeleteSuccess) onDeleteSuccess(); 
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete product");
    }
  };

  const handleToggleStatus = async () => {
    const newStatus =
      product.status === "published" ? "unpublished" : "published";
    try {
      await updateProduct(product._id, { status: newStatus });
      onStatusChange();
    } catch (error) {
      alert("Failed to update status");
    }
  };

  const isPublished = product.status === "published";

  return (
    <>
      {/* --- MAIN CARD --- */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col h-full relative">
        {/* Carousel Section */}
        <div
          className="h-48 w-full bg-gray-100 rounded-xl mb-4 overflow-hidden relative group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={currentImageUrl}
            alt={product.name}
            className="w-full h-full object-contain mix-blend-multiply transition-opacity duration-300"
          />

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className={`absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full shadow-md hover:bg-white transition-opacity ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              >
                <FiChevronLeft />
              </button>
              <button
                onClick={nextImage}
                className={`absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full shadow-md hover:bg-white transition-opacity ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              >
                <FiChevronRight />
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {images.length > 1 && (
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => goToImage(idx, e)}
                  className={`h-2 w-2 rounded-full transition-all ${
                    currentImageIndex === idx
                      ? "bg-orange-500 w-4"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Title */}
        <h3
          className="font-bold text-gray-800 text-lg mb-4 truncate"
          title={product.name}
        >
          {product.name}
        </h3>

        {/* --- DETAILS GRID (Fully Restored from Your Code) --- */}
        <div className="space-y-2 text-sm text-gray-500 mb-6 flex-grow">
          <div className="flex justify-between">
            <span>Product type -</span>
            <span className="text-gray-800 font-medium">
              {product.category}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Quantity Stock -</span>
            <span className="text-gray-800 font-medium">{product.stock}</span>
          </div>
          <div className="flex justify-between">
            <span>MRP -</span>
            <span className="text-gray-800 font-medium">₹ {product.mrp}</span>
          </div>
          <div className="flex justify-between">
            <span>Selling Price -</span>
            <span className="text-gray-800 font-medium">
              ₹ {product.sellingPrice}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Exchange Eligibility -</span>
            <span className="text-gray-800 font-medium">
              {product.exchangeEligible ? "YES" : "NO"}
            </span>
          </div>
          <div className="flex justify-between border-t pt-2 mt-2">
            <span>Images -</span>
            <span className="text-gray-800 font-medium">{images.length}</span>
          </div>
        </div>

        {/* --- ACTION BUTTONS --- */}
        <div className="flex gap-2 mt-auto">
          {/* Status Button */}
          <button
            onClick={handleToggleStatus}
            className={`flex-1 text-white py-2 rounded-lg font-medium transition ${
              isPublished
                ? "bg-lime-500 hover:bg-lime-600"
                : "bg-blue-700 hover:bg-blue-800"
            }`}
          >
            {isPublished ? "Unpublish" : "Publish"}
          </button>

          {/* Edit Button */}
          <button
            onClick={() => onEdit(product)}
            className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2"
          >
            Edit
          </button>

          {/* Delete Button (Modified to trigger Modal) */}
          <button
            onClick={handleDeleteClick}
            className="w-10 flex items-center justify-center border border-gray-300 text-gray-500 rounded-lg hover:text-red-600 hover:border-red-200 transition"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>

      {/* --- MODAL (Outside the visual card, Logic connected) --- */}
      <DeleteProduct
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleConfirmDelete}
        productName={product.name}
      />
    </>
  );
};

export default ProductCard;
