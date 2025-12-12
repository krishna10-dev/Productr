import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Foods', 'Electronics', 'Clothes', 'Beauty Products', 'Others'], 
    required: true 
  },
  stock: { type: Number, required: true },
  mrp: { type: Number, required: true },
  sellingPrice: { type: Number, required: true },
  brand: { type: String, required: true },
  images: [{ type: String, required: true }],
  status: { 
    type: String, 
    enum: ['published', 'unpublished'], 
    default: 'published' 
  },
  exchange: { type: String, default: 'Yes', enum: ['Yes', 'No'] }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);