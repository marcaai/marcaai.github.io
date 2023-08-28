import { useAxios } from '../utils/axios-setup';

function useItemAPI() {
  const { axios } = useAxios();

  function loadItemFromRemote(id) {
    const url = `/vbeta2/menu/items/${id}`;

    return axios({
      url,
      method: 'get',
      responseType: 'json',
    });
  }

  return {
    loadItemFromRemote,
  };
}

export { useItemAPI };
