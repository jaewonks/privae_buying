import axios from 'axios';
import { apiUrl } from './config.js'

export const getOrders = async () => {
  try {
    const response = await axios({
      url: `${apiUrl}/api/orders`,
      method: 'GET',
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
      method: 'GET',
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
      method: 'GET',
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

export const buyingInfo = async ({orderId,link,originalprice}) => {
  try {
    const response = await axios({
      url: `${apiUrl}/api/buyings/info`,
      method: 'POST',
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
