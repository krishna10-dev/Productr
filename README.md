# Productr - Full Stack Product Management Dashboard

A responsive, pixel-perfect MERN Stack application for managing product inventories. This project features secure authentication, image uploads, and a dynamic dashboard, built to meet specific design requirements.

## 🚀 Live Demo
- **Frontend (Netlify):** [Replace with your Netlify URL]
- **Backend (Render):** [Replace with your Render URL]

## ✨ Key Features
- **Authentication:** Secure Login/Signup with OTP verification (JWT-based session management).
- **Product Management:** Full CRUD capabilities (Create, Read, Update, Delete) for products.
- **Image Handling:** Support for uploading multiple product images.
- **Filtering:** Tab-based filtering for "Published" and "Unpublished" products.
- **Search:** Real-time search functionality by product name or category.
- **Responsive Design:** Pixel-perfect implementation of the provided Figma design using Tailwind CSS.
- **Smart Routing:** Protected routes that redirect unauthenticated users to the login page.

## 🛠️ Tech Stack
- **Frontend:** React.js, Tailwind CSS, Axios, React Router v6
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Atlas), Mongoose
- **Tools:** Multer (File Uploads), JWT (Auth), Nodemailer (OTP Logic)

## 📂 Project Structure
This is a monorepo containing both client and server:
```bash
/
├── client/     # React Frontend
└── server/     # Node.js Backend

⚙️ Local Installation Guide
Prerequisites
Node.js installed

MongoDB URI (Local or Atlas)

1. Backend Setup
cd server
npm install
# Create a .env file with:
# PORT=5000
# MONGO_URI
# JWT_SECRET
npm run dev

2. Frontend Setup
cd client
npm install
npm start

🔐 API Endpoints
Method	 Endpoint	            Description	
POST	 /api/auth/send-otp	    Send OTP to Email/Phone	
POST	 /api/auth/login	    Verify OTP & Get Token	
GET	     /api/products	        Fetch all products	
POST	 /api/products	        Create a new product (Multipart)	
PUT	     /api/products/:id	    Update product details	
DELETE	 /api/products/:id	    Delete a product	


Deployment Check (Important)
Since I am using Render's Free Tier, there is a catch: "Ephemeral Filesystem".
This means when you upload an image, it saves to the server.
But when Render "restarts" (which happens often on free tier), the uploaded files are deleted.
For a professional assignment, this is usually acceptable but i am making Assignment for demo purpose.


NOTE : 
    The backend is hosted on a free instance. Please allow 30-60 seconds for the initial load while the server wakes up
