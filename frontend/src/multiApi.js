import axios from 'axios';
import { apiUrl } from './config.js'

export const getInfo = async (id) => {
  try {
    await axios.all([
      axios.get(`${apiUrl}/api/orders`),
      axios.get(`${apiUrl}/api/buying/${id}`)
    ])
    .then(axios.spread((res1, res2) => {
      const orderRes = res1.data;
      console.log(orderRes)
      const imgRes = res2.data;
      console.log(imgRes)
      const res = [...orderRes, ...imgRes];
      
      if(!response || response.statusText !== 'OK') {
        throw new Error(response.message)
      } 
      return handler(res);
      })
    );
  } catch (err) {
    console.log(err);
    return { error: response.message || err.message }
  }
};    