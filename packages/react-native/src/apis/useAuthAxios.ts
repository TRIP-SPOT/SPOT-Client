import axios from 'axios';
import { BASE_URL } from '@env';
import { useToken } from '@/hooks/useToken';

const getNewToken = async (baseURL: string, refresh: string) => {
  const { data } = await axios.post(`${baseURL}/api/refresh`, {
    headers: { Authorization: `Bearer ${refresh}` },
  });
  return data as { accessToken: string; refreshToken: string };
};

const useAuthAxios = () => {
  const { access, refresh, setAccess, setRefresh } = useToken();

  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${access}`,
    },
    timeout: 100000,
  });

  instance.interceptors.response.use(
    (res) => res,
    async (error) => {
      const {
        config,
        response: { status },
      } = error;

      if (status === 401) {
        try {
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
            await getNewToken(BASE_URL, refresh);
          config.headers.Authorization = `Bearer ${newAccessToken}`;
          const response = await axios.get(config.url, config);
          setAccess(newAccessToken);
          setRefresh(newRefreshToken);
          return await Promise.resolve(response);
        } catch (err) {
          return Promise.reject(err);
        }
      }
      return Promise.reject(error);
    },
  );

  return instance;
};

export default useAuthAxios;
