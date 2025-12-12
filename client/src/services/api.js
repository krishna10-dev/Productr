import axios from 'axios';

const API = axios.create({ baseURL: 'http://192.168.1.8:5000/api' });


API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const sendOtp = (data, type) => API.post('/auth/send-otp', { ...data, type });

export const verifyOtp = (data) => API.post('/auth/login', data);

export const fetchProducts = async () => {
  const response = await API.get('/products');
  return response.data;
};

export const addProduct = async (productData) => {
  const response = await API.post('/products', productData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await API.put(`/products/${id}`, productData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await API.delete(`/products/${id}`);
  return response.data;
};