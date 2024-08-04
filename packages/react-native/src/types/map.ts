import mapData from '@/assets/mapData';

type GeoJson = (typeof mapData)['features'][number];

type GetProperties<T extends GeoJson[]> = {
  [Key in keyof T]: T[Key]['properties']['CTP_KOR_NM'];
}[number];

export type KoreaLocationName = GetProperties<(typeof mapData)['features']>;
