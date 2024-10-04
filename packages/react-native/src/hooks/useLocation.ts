import { useState, useEffect } from 'react';
import useGeolocation from './useGeolocation';

export interface Location {
  latitude?: number;
  longitude?: number;
}

export default function useLocation() {
  const { getGeolocation } = useGeolocation();
  const [location, setLocation] = useState<Location>();

  useEffect(() => {
    getGeolocation().then((res) => {
      setLocation({
        latitude: res?.coords.latitude,
        longitude: res?.coords.longitude,
      });
    });
  }, []);

  return { location };
}
