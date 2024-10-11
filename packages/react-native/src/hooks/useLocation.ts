import { useEffect, useState } from 'react';
import useGeolocation, { Location } from './useGeolocation';

export default function useLocation() {
  const { getGeolocation } = useGeolocation();

  const [location, setLocation] = useState<Location>();

  useEffect(() => {
    getGeolocation().then((res) => {
      if (res) {
        setLocation(res);
      }
    });
  }, []);

  return location;
}
