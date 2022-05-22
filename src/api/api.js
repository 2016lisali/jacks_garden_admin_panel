import axios from "axios";

//connect to live server
const BASE_URL = process.env.REACT_APP_BASE_URL_CLOUD;

// connect to local server
// const BASE_URL = process.env.REACT_APP_BASE_URL_LOCAL;
const API = axios.create({
  baseURL: BASE_URL + "/api",
  headers: { 'Content-Type': "application/json" },
})

API.interceptors.request.use(req => {
  if (localStorage.getItem('jg_admin')) {
    req.headers.token = `Bearer ${JSON.parse(localStorage.getItem('jg_admin')).user.token}`;
  }
  return req;
})

//Auth API
export const login = (formData) => API.post("/users/login", formData);

// Products API
export const getAllProducts = () => API.get("/products");
export const getProductById = (productId) => API.get(`/products/${productId}`);
export const getProductAndOrderSummary = () => API.get("/products/summary");
export const createProduct = (formData) => API.post("/products", formData);
export const updateProduct = (formData) => API.patch(`/products/${formData.productId}`, formData);
export const getProductBySearch = (productname, category) => API.get(`/products/search?productname=${productname}&category=${category}`);
export const deleteProductById = (productId) => API.delete(`/products/${productId}`);


// upload product Img
export const uploadImg = (img) => API.post("/uploadfiles", img, {
  headers: { 'content-type': 'multipart/form-data' }
});

// User API
export const createUser = (formData) => API.post("/users/register", formData);
export const getAllUsers = () => API.get("/users");
export const getUserById = (userId) => API.get(`/users/${userId}`);
export const getUserBySearch = (email, name) => API.get(`/users/search?email=${email}&name=${name}`)
export const updateUser = (formData) => API.patch(`/users/${formData.userId}`, formData)
export const deleteUser = (userId) => API.delete(`/users/${userId}`);
export const register = (formData) => API.post("/users/register", formData);

// Email List API
export const getEmailList = () => API.get("/users/emails");
// Order API
export const getAllOrders = () => API.get("/orders");
export const getOrderDetails = (orderId) => API.get(`/orders/${orderId}`)
export const getOrderBillingDetails = (orderId) => API.get(`/orders/billings/${orderId}`)
export const getOrderSummary = () => API.get("/orders/summary");
export const updateOrder = (orderId, formData) => API.patch(`/orders/${orderId}`, formData)
export const deleteOrderById = (orderId) => API.delete(`/orders/${orderId}`);