import { RegionRepresentImage } from '@/apis/queries/records/useRecordRepresentativeQuery';

// Stoarge에 저장할 value 타입, 인터페이스를 작성해주세요.

/**
 * nickname 관련 정보 저장
 */
export interface NicknameStorageValue {
  value: string;
  colorSet?: {
    color: string;
    bgColor: string;
  };
}

/**
 * 지역별 대표 이미지 저장
 */
type RegionRepresentImageStorageValue = RegionRepresentImage;

/**
 * 토큰 저장
 */
export interface AuthToken {
  access: string;
  refresh: string;
}

// ================================================================
// Storage에 안전하게 데이터를 저장하기 위한 타입입니다.
// 위에서 작성한 타입을 key(고유한 key), value를 형태로 작성해주세요.
export type StorageData = {
  nickname: NicknameStorageValue;
  representImage: RegionRepresentImageStorageValue;
  profileImage: string;
  token: AuthToken;
};
