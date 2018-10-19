import axios from 'axios'
const baseUrl = 'http://localhost:5000/eshop-back/us-central1/eshop';
axios.defaults.baseURL = baseUrl;
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const loginRequestApi = (user,pass)=>{

  return axios.post('/login',{username: user, password:pass});

}

export const logoutRequestApi = (user,pass)=>{

    return axios.post('/logout');
}

export const fetchProducts = () => {
 
  return axios.get('/products', {
    headers: {
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    }
  })
}