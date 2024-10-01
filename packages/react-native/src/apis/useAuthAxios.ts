import axios, { InternalAxiosRequestConfig, isAxiosError } from 'axios';
import { BASE_URL } from '@env';
import { useToken } from '@/hooks/useToken';
import { ServerResponse } from '@/types/response';
import { AppStorage } from '@/utils/storage';

interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

interface CustomAxiosConfig extends InternalAxiosRequestConfig<unknown> {
  retry?: boolean;
}

const getNewToken = async (baseURL: string, refresh: string) => {
  const { data } = await axios.post<ServerResponse<RefreshTokenResponse>>(
    `${baseURL}/api/refresh`,
    {
      refreshToken: refresh,
    },
  );
  return data.result;
};

const requestDebounceKeyValue: Record<string, number> = {};
const controller = new AbortController();

const useAuthAxios = () => {
  const { access, refresh, setAccess, setRefresh } = useToken();

  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${access}`,
    },
    timeout: 100000,
    signal: controller.signal,
  });

  instance.interceptors.request.use((config) => {
    const customConfig = config as CustomAxiosConfig;
    const retry = customConfig?.retry;
    if (
      config.url &&
      !retry &&
      (config.method === 'post' ||
        config.method === 'patch' ||
        config.method === 'delete')
    ) {
      const currentTime = new Date();
      currentTime.setMilliseconds(0);
      const requestKey = config.url;
      const isExistRequest =
        requestDebounceKeyValue[requestKey] === currentTime.getTime();

      if (isExistRequest) {
        controller.abort();
        return config;
      }

      requestDebounceKeyValue[requestKey] = currentTime.getTime();
    }
    return config;
  });

  instance.interceptors.response.use(
    (res) => res,
    async (error) => {
      const { config, response } = error;
      const status = response?.status;

      if (status === 401) {
        try {
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
            await getNewToken(BASE_URL, refresh);
          config.headers.Authorization = `Bearer ${newAccessToken}`;
          config.retry = true;
          const retryResponse = await axios(config);
          setAccess(newAccessToken);
          setRefresh(newRefreshToken);
          return await Promise.resolve(retryResponse);
        } catch (err) {
          if (isAxiosError(err) && err.response?.status === 401) {
            await AppStorage.deleteData('token');
          }

          return Promise.reject(err);
        }
      }
      return Promise.reject(error);
    },
  );

  return instance;
};

export default useAuthAxios;
