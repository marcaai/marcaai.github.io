import axios from 'axios';
import { useEffect } from 'react';

const axiosTimeout = 80000;

function useAxios() {
  return {
    axios,
  };
}

function useAxiosLog() {
  // const isLogActive = true;
  const isLogActive = false;

  useEffect(() => {
    // axiosSetup();

    const reqInterceptor = axios.interceptors.request.use(
      (config) => {
        if (isLogActive) {
          console.warn({
            type: 'request',
            url: config.url,
            method: config.method,
          });
        }
        return config;
      },
      (error) => {
        if (isLogActive) {
          console.error('request');
          console.error(error);

          // analyticsException(error);
        }
        return Promise.reject(error);
      }
    );

    const resInterceptor = axios.interceptors.response.use(
      (response) => {
        if (isLogActive) {
          console.warn({
            type: 'response',
            url: response.config.url,
            method: response.config.method,
            status: response.status,
          });
        }

        if (response.status === 204) {
          response.data = null;
        }

        return response;
      },

      (error) => {
        if (isLogActive) {
          console.error('response');
          console.error(error);

          if (error.response != null) {
            console.error(error.response.data);

            // analyticsException(error.response.data);
          } else {
            // analyticsException(error);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(reqInterceptor);
      axios.interceptors.request.eject(resInterceptor);
    };
  }, []);
}

function axiosSetup() {
  // const host = currentHost;
  // axios.defaults.baseURL = `${host.baseUrl}`;

  // axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  // axios.defaults.headers.common['Accept-Encoding'] = 'gzip';
  axios.defaults.timeout = axiosTimeout;
}

export { axiosSetup, useAxios, useAxiosLog };
