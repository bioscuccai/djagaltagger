import axios from 'axios';

const axiosInstance = axios.create();


axiosInstance.defaults.xsrfCookieName = 'csrftoken';
axiosInstance.defaults.xsrfHeaderName = 'X-CSRFToken';

axiosInstance.interceptors.response.use(response => {
  return response;
}, err => {
  if (err.response.status === 403) {
    window.location.href = '/accounts/login/';
  }

  return Promise.reject(err);
});

export default axiosInstance;
