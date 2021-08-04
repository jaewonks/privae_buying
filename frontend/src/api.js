import axios from 'axios';
import { apiUrl } from './config.js'

export const getOrders = async () => {
  try {
    const response = await axios({
      url: `${apiUrl}/api/orders`,
      method: 'get',
    })
    if(!response || response.statusText !== 'OK') {
      throw new Error(reponse.message)
    } 
    return response;
  } catch (err) {
    console.log(err);
    return { error: response.message || err.message }
  }
};

export const getProduct = async (id) => {
  try {
    const response = await axios({
      url: `${apiUrl}/api/buying/${id}`,
      method: 'get',
    })
    if(!response || response.statusText !== 'OK') {
      throw new Error(reponse.message)
    } 
    return response.data.product;
  } catch (err) {
    console.log(err);
    return { error: response.message || err.message }
  }
};

export const getBuyingInfo = async (id) => {
  try {
    const response = await axios({
      url: `${apiUrl}/api/buyings/info/${id}`,
      method: 'get',
    })
    if(!response || response.statusText !== 'OK') {
      throw new Error(reponse.message)
    } 
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: response.message || err.message }
  }
};

export const buyingInfo = async ({orderId,link,originalprice}) => {
  try {
    const response = await axios({
      url: `${apiUrl}/api/buyings/info`,
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      }, 
      data: {
        orderId,
        link,
        originalprice,
      }
    })

    if(!response || response.statusText !== 'OK') {
      throw new Error(reponse.data.message)
    } 
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: response.data.message || err.message }
  }
};

export const orderInfo = async ({orderId,place,detail,price,date}) => {
  try {
    const response = await axios({
      url: `${apiUrl}/api/orderings/info`,
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      }, 
      data: {
        orderId,
        place,
        detail,
        price,
        date
      }
    })

    if(!response || response.statusText !== 'OK') {
      throw new Error(reponse.data.message)
    } 
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: response.data.message || err.message }
  }
}

export const getOrderInfo = async (id) => {
  try {
    const response = await axios({
      url: `${apiUrl}/api/orderings/info/${id}`,
      method: 'get',
    })
    if(!response || response.statusText !== 'OK') {
      throw new Error(reponse.message)
    } 
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: response.message || err.message }
  }
};

export const getAuth = async (token) => {
  try {
    const response = await axios({
      url: `${apiUrl}/api/auth/token`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }, 
      data: token
    })
    console.log(token)

    if(!response || response.statusText !== 'OK') {
      throw new Error(reponse.data.message)
    } 
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: response.data.message || err.message }
  }
}
 
const axiosApiInstance = axios.create();
 
//Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async config => {
    const userInfo = window.sessionStorage.getItem('userInfo');
    const accessToken = userInfo ? JSON.parse(userInfo).accessToken : null;
    config.headers = { 
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json',
    }
    return config;
  },
  error => {
    Promise.reject(error)
});
 
// Response interceptor for API calls
axiosApiInstance.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    console.log('토큰 만료')
    originalRequest._retry = true;
    const sessionObj = window.sessionStorage.getItem('token');
    let tokenInfo = sessionObj ? JSON.parse(sessionObj) : null;
    const access_token = await refreshAccessToken(tokenInfo.refreshToken);
    if(tokenInfo){
      originalRequest.headers['Authorization'] = 'Bearer ' + access_token;
      tokenInfo.accessToken = access_token;
      window.sessionStorage.setItem('tokenInfo', JSON.stringify(tokenInfo));
    }
    return axios(originalRequest);
  }
  return Promise.reject(error);
});
 
