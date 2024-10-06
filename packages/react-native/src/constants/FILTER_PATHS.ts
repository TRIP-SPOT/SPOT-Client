const FILTER_FULL_PATHS = [
  {
    filter: require('../assets/filters/dokkaebi1.png'),
    thumbnail: require('../assets/filters/thumb_dokkaebi1.png'),
  },
  {
    filter: require('../assets/filters/dokkaebi2.png'),
    thumbnail: require('../assets/filters/thumb_dokkaebi2.png'),
  },
  {
    filter: require('../assets/filters/dongbaekkkotPilMuryeop1.png'),
    thumbnail: require('../assets/filters/thumb_dongbaekkkotPilMuryeop1.png'),
  },
  {
    filter: require('../assets/filters/dongbaekkkotPilMuryeop2.png'),
    thumbnail: require('../assets/filters/thumb_dongbaekkkotPilMuryeop2.png'),
  },
  {
    filter: require('../assets/filters/mrSunshine.png'),
    thumbnail: require('../assets/filters/thumb_mrSunshine.png'),
  },
  {
    filter: require('../assets/filters/saranguiBulsiChak1.png'),
    thumbnail: require('../assets/filters/thumb_saranguiBulsiChak1.png'),
  },
  {
    filter: require('../assets/filters/saranguiBulsiChak2.png'),
    thumbnail: require('../assets/filters/thumb_saranguiBulsiChak2.png'),
  },
  {
    filter: require('../assets/filters/seumuldaseotSeumulHana1.png'),
    thumbnail: require('../assets/filters/thumb_seumuldaseotSeumulHana1.png'),
  },
  {
    filter: require('../assets/filters/seumuldaseotSeumulHana2.png'),
    thumbnail: require('../assets/filters/thumb_seumuldaseotSeumulHana2.png'),
  },
  {
    filter: require('../assets/filters/itaewonClass.png'),
    thumbnail: require('../assets/filters/thumb_itaewonClass.png'),
  },
];

const FILTER_PATHS = FILTER_FULL_PATHS.map((item) => item.filter);
const THUMBNAIL_PATHS = FILTER_FULL_PATHS.map((item) => item.thumbnail);

export { FILTER_PATHS, THUMBNAIL_PATHS };
