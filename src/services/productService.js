import apiClient from './apiClient';

export const fetchProducts = ({ limit = 200, skip = 0 } = {}) =>
  apiClient.get('/products', { params: { limit, skip } }).then((res) => res.data);

export const fetchCategories = () =>
  apiClient.get('/products/categories').then((res) => res.data);

export const fetchProductsByCategory = (category) =>
  apiClient
    .get(`/products/category/${encodeURIComponent(category)}`)
    .then((res) => res.data);

export const fetchProductById = (id) =>
  apiClient.get(`/products/${id}`).then((res) => res.data);
