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
    } // 응답 상태가 ok가 아니면 리턴되는 에러
    return response;
  } catch (err) {
    console.log(err);
    return { error: response.message || err.message }
  }
};



