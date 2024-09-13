import { City, REGION, Region, REVERSE_REGION_MAPPER } from '@/constants/CITY';

interface GetDisplayRegionParams {
  locationEnum: Region;
  cityEnum: City;
  onlyCity?: boolean;
}

export const getDisplayRegion = ({
  locationEnum,
  cityEnum,
  onlyCity,
}: GetDisplayRegionParams) => {
  const region = REVERSE_REGION_MAPPER[locationEnum];
  const city = Object.entries(REGION[REVERSE_REGION_MAPPER[locationEnum]]).find(
    (entry) => {
      return entry[1] === cityEnum;
    },
  )?.[0];

  if (onlyCity) {
    return city;
  }

  return `${region} ${city}`;
};
