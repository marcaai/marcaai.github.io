import { useAxios } from '../utils/axios-setup';

function useNextinAPI() {
  const { axios } = useAxios();

  function nextinLogon(email, password) {
    const url = `https://homeapp.nextin.com.br/account/v1/logon`;

    const data = {
      email,
      pass: password,
    };

    return axios({
      url,
      method: 'POST',
      data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      responseType: 'json',
    });
  }

  return {
    nextinLogon,
  };
}

export { useNextinAPI };
