import { createApiFetcher } from 'axios-multi-api';
import { apiUrl } from './config.js'

export const api = async () => { 
  try {
    const response = await createApiFetcher({
      apiUrl: `${apiUrl}/api`,
      apiEndpoints: {
        getOrders: {
          method: 'GET',
          url: '/orders',
        },
        getImage: {
          method: 'GET',
          url: '/buying/:id',
        },
      },
    }); 
    if(!response || response.statusText !== 'OK') {
      throw new Error(reponse.message)
    } // 응답 상태가 ok가 아니면 리턴되는 에러
    console.log(reponse);
    return response;

  } catch (err) {
    console.log(err);
    return { error: response.message || err.message }
  }
}

