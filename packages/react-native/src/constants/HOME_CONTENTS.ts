import { ImageSourcePropType } from 'react-native';

export type ContentTitle = 'popular-spot' | 'set-jetting';

interface Content {
  title: ContentTitle;
  image: ImageSourcePropType;
}

const HOME_CONTENTS: Content[] = [
  {
    title: 'popular-spot',
    image: require('../assets/home/popular-spot.png'),
  },
  {
    title: 'set-jetting',
    image: require('../assets/home/set-jetting.png'),
  },
];

export default HOME_CONTENTS;
