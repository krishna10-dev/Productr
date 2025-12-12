import express from 'express';
import { createProduct, getProducts, deleteProduct, updateProduct } from '../controllers/productController.js';
import upload from '../middleware/upload.js'; 


const router = express.Router();

router.post('/', upload.array('images', 5), createProduct);
router.get('/', getProducts);
router.delete('/:id', deleteProduct);
router.put('/:id', upload.array('images', 5), updateProduct);

export default router;