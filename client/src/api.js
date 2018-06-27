import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(response => {
  return response;
}, err => {
  if (err.response.status === 403) {
    window.location.href = '/accounts/login/';
  }

  return Promise.reject(err);
});

export default axiosInstance;
