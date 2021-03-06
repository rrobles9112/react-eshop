import axios from 'axios'
const baseUrl = 'http://localhost:5000/eshop-back/us-central1/eshop';
axios.defaults.baseURL = baseUrl;
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

export const loginRequestApi = (user, pass) => {

  return axios.post('/login', {
    username: user,
    password: pass
  });

}

export const logoutRequestApi = (user, pass) => {

  return axios.post('/logout');
}

export const fetchProducts = () => {

  return axios.get('/products', {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    }
  })
}