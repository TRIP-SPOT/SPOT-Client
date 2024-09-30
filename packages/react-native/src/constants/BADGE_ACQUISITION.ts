/* eslint-disable no-shadow */
export enum BadgeAcquisition {
  BY_QUIZ,
  BY_CAMERA_FILTER,
  BY_RECORD,
}

export const ACQUISITION_MAPPER: Record<BadgeAcquisition, string> = {
  [BadgeAcquisition.BY_QUIZ]: 'Spot! 퀴즈 정답',
  [BadgeAcquisition.BY_CAMERA_FILTER]: 'Spot! 카메라 필터',
  [BadgeAcquisition.BY_RECORD]: '소중한 여행 기록 작성',
};
