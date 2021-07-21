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
    //return response.data.product.model_name;
  } catch (err) {
    console.log(err);
    return { error: response.message || err.message }
  }
};



