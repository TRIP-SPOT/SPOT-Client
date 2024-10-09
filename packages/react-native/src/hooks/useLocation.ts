import useGeolocation from './useGeolocation';

export interface Location {
  latitude?: number;
  longitude?: number;
}

export default function useLocation() {
  const { getGeolocation } = useGeolocation();

  const fetchLocation = async (): Promise<Location | undefined> => {
    const res = await getGeolocation();
    if (!res) return undefined;

    return {
      latitude: res.coords.latitude,
      longitude: res.coords.longitude,
    };
  };

  return fetchLocation(); // Promise 반환
}
