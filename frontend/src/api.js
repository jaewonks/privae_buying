import axios from 'axios';
import { apiUrl } from './config.js'

export const getOrders = async () => {
  try {
    const response = await axios({
      url: `${apiUrl}/api/orders`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if(response.statusText !== 'OK') {
      throw new Error(reponse.data.message)
    } // 응답 상태가 ok가 아니면 리턴되는 에러
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: err.reponse.message || err.message }
  }
};