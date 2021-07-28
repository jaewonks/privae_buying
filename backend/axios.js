import axios from 'axios';
import GLOBALS from 'src/common/globals';
 
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
    const sessionObj = window.sessionStorage.getItem('userInfo');
    let userInfo = sessionObj ? JSON.parse(sessionObj) : null;
    const access_token = await refreshAccessToken(userInfo.refreshToken);
    if(userInfo){
      originalRequest.headers['Authorization'] = 'Bearer ' + access_token;
      userInfo.accessToken = access_token;
      window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
    }
    return axios(originalRequest);
  }
  return Promise.reject(error);
});

 