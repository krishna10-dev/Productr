import Product from '../models/Product.js'; // .js is REQUIRED

// Create Product
export const createProduct = async (req, res) => {
  try {
    const { name, category, stock, mrp, sellingPrice, brand, status } = req.body;
    
    // Handle Image Paths
    let imagePaths = [];
    if (req.files && req.files.length > 0) {
      imagePaths = req.files.map(file => `/uploads/${file.filename}`);
    }

    const product = await Product.create({
      name,
      category,
      stock,
      mrp,
      sellingPrice,
      brand,
      images: imagePaths,
      status: status || 'published'
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get Products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    
    await product.deleteOne();
    res.json({ message: 'Product removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateProduct = async (req, res) => {
  try {
    const { name, category, stock, mrp, sellingPrice, brand, status, exchange } = req.body;
    
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Update fields
    product.name = name || product.name;
    product.category = category || product.category;
    product.stock = stock || product.stock;
    product.mrp = mrp || product.mrp;
    product.sellingPrice = sellingPrice || product.sellingPrice;
    product.brand = brand || product.brand;
    product.status = status || product.status;
    product.exchange = exchange || product.exchange;


    // Logic: If new images are uploaded, append them to the existing list
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => `/uploads/${file.filename}`);
      product.images = [...product.images, ...newImages];
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};