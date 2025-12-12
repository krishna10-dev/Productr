import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';

// Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import Routes (Note the .js extension is MANDATORY in this mode)
import productRoutes from './routes/productRoutes.js';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static Folder for Images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes)

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log('MongoDB Connected');
  
  // RUN THIS ONCE TO CLEAN THE MESS
  // await mongoose.connection.collection('users').drop(); 
  // console.log('Users collection dropped to fix indexes');

}).catch(err => console.log(err));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));