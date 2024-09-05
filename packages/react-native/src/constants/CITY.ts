/* eslint-disable no-shadow */
export enum City {
  SEOUL,
  BUSAN,
  GWANGJU_GWANGYEOKSI,
  DAEJEON,
  DAEGU,
  SAEJOENG,
  ULSAN,
  INCHEON,

  // GYEONGGI
  SUWON,
  SEONGNAM,
  UIJEONGBU,
  ANYANG,
  BUCHEON,
  GWANGMYEONG,
  PYEONGTAEK,
  ANSAN,
  GOYANG,
  GWACHEON,
  GURI,
  NAMYANGJU,
  OSAN,
  SIHEUNG,
  GUNPO,
  UIWANG,
  HANAM,
  YONGIN,
  PAJU,
  ICHEON,
  ANSEONG,
  GIMPO,
  HWASEONG,
  GWANGJU,
  YANGJU,
  POCHEON,
  YEOJU,
  DONGDUCHEON,
  YEONCHEON,
  GAPYEONG,
  YANGPYEONG,

  // GANGWON
  CHUNCHEON,
  WONJU,
  GANGNEUNG,
  DONGHAE,
  TAEBAEK,
  SOKCHO,
  SAMCHEOK,
  HONGCHEON,
  HOENGSEONG,
  YEONGWOL,
  PYEONGCHANG,
  JEONGSEON,
  CHEOLWON,
  HWACHEON,
  YANGGU,
  INJE,
  GANGWON_GOSEONG,
  YANGYANG,

  // GYEONGBUK
  POHANG,
  GYEONGJU,
  GIMCHEON,
  ANDONG,
  GUMI,
  YEONGJU,
  YEONGCHEON,
  SANGJU,
  MUNGYEONG,
  GYEONGSAN,
  UISEONG,
  CHEONGSONG,
  YEONGYANG,
  YEONGDEOK,
  CHEONGDO,
  GORYEONG,
  SEONGJU,
  CHILGOK,
  YECHEON,
  BONGHWA,
  ULJIN,
  ULLEUNG,

  // GYEONGNAM
  CHANGWON,
  JINJU,
  TONGYEONG,
  SACHEON,
  GIMHAE,
  MIRYANG,
  GEOJE,
  YANGSAN,
  UIRYEONG,
  HAMAN,
  CHANGNYEONG,
  GYEONGNAM_GOSEONG,
  NAMHAE,
  HADONG,
  SANCHEONG,
  HAMYANG,
  GEOCHANG,
  HAPCHEON,

  // JEJU
  JEJU,
  SEOGWIPO,

  // CHUNGBUK
  CHEONGJU,
  CHUNGJU,
  JECHEON,
  BOEUN,
  OKCHEON,
  YEONGDONG,
  JEUNGPYEONG,
  JINCHEON,
  GOESAN,
  EUMSEONG,
  DANYANG,

  // CHUNGNAM
  CHEONAN,
  GONGJU,
  BORYEONG,
  ASAN,
  SEOSAN,
  NONSAN,
  GYEORYONG,
  DANGJIN,
  GUMSAN,
  BUYEON,
  SEOCHEON,
  CHEONGYANG,
  HONGSEONG,
  YESAN,
  TAEAN,

  // JEONBUK
  JEONJU,
  GUNSAN,
  IKSAN,
  JEONGEUP,
  NAMWON,
  GIMJE,
  WANJU,
  JINAN,
  MUJU,
  JANGSU,
  IMSIL,
  SUNCHANG,
  GOCHANG,
  BUAN,

  // JEONNAM
  MOKPO,
  YEOSU,
  SUNCHEON,
  NAJU,
  GWANGYANG,
  DAMYANG,
  GOKSEONG,
  GURYE,
  GOHEUNG,
  BOSEONG,
  HWASUN,
  JANGHEUNG,
  GANGJIN,
  HAENAM,
  YEONGAM,
  MUAN,
  HAMPYEONG,
  YEONGGWANG,
  JANGSEONG,
  WANDO,
  JINDO,
  SINAN,
}

export const REGION = {
  서울특별시: {
    서울: City.SEOUL,
  },
  대구광역시: {
    대구: City.DAEGU,
  },
  대전광역시: {
    대전: City.DAEJEON,
  },
  부산광역시: {
    부산: City.BUSAN,
  },
  광주광역시: {
    광주: City.GWANGJU_GWANGYEOKSI,
  },
  세종특별자치시: {
    세종: City.SAEJOENG,
  },
  울산광역시: {
    울산: City.ULSAN,
  },
  인천광역시: {
    인천: City.INCHEON,
  },
  경기도: {
    수원: City.SUWON,
    성남: City.SEONGNAM,
    의정부: City.UIJEONGBU,
    안양: City.ANYANG,
    부천: City.BUCHEON,
    광명: City.GWANGMYEONG,
    평택: City.PYEONGTAEK,
    안산: City.ANSAN,
    고양: City.GOYANG,
    과천: City.GWACHEON,
    구리: City.GURI,
    남양주: City.NAMYANGJU,
    오산: City.OSAN,
    시흥: City.SIHEUNG,
    군포: City.GUNPO,
    의왕: City.UIWANG,
    하남: City.HANAM,
    용인: City.YONGIN,
    파주: City.PAJU,
    이천: City.ICHEON,
    안성: City.ANSEONG,
    김포: City.GIMPO,
    화성: City.HWASEONG,
    광주: City.GWANGJU,
    양주: City.YANGJU,
    포천: City.POCHEON,
    여주: City.YEOJU,
    동두천: City.DONGDUCHEON,
    연천: City.YEONCHEON,
    가평: City.GAPYEONG,
    양평: City.YANGPYEONG,
  },
  강원도: {
    춘천: City.CHUNCHEON,
    원주: City.WONJU,
    강릉: City.GANGNEUNG,
    동해: City.DONGHAE,
    태백: City.TAEBAEK,
    속초: City.SOKCHO,
    삼척: City.SAMCHEOK,
    홍천: City.HONGCHEON,
    횡성: City.HOENGSEONG,
    영월: City.YEONGWOL,
    평창: City.PYEONGCHANG,
    정선: City.JEONGSEON,
    철원: City.CHEOLWON,
    화천: City.HWACHEON,
    양구: City.YANGGU,
    인제: City.INJE,
    고성: City.GANGWON_GOSEONG,
    양양: City.YANGYANG,
  },
  경상북도: {
    포항: City.POHANG,
    경주: City.GYEONGJU,
    김천: City.GIMCHEON,
    안동: City.ANDONG,
    구미: City.GUMI,
    영주: City.YEONGJU,
    영천: City.YEONGCHEON,
    상주: City.SANGJU,
    문경: City.MUNGYEONG,
    경산: City.GYEONGSAN,
    의성: City.UISEONG,
    청송: City.CHEONGSONG,
    영양: City.YEONGYANG,
    영덕: City.YEONGDEOK,
    청도: City.CHEONGDO,
    고령: City.GORYEONG,
    성주: City.SEONGJU,
    칠곡: City.CHILGOK,
    예천: City.YECHEON,
    봉화: City.BONGHWA,
    울진: City.ULJIN,
    울릉: City.ULLEUNG,
  },
  경상남도: {
    창원: City.CHANGWON,
    진주: City.JINJU,
    통영: City.TONGYEONG,
    사천: City.SACHEON,
    김해: City.GIMHAE,
    밀양: City.MIRYANG,
    거제: City.GEOJE,
    양산: City.YANGSAN,
    의령: City.UIRYEONG,
    함안: City.HAMAN,
    창녕: City.CHANGNYEONG,
    고성: City.GYEONGNAM_GOSEONG,
    남해: City.NAMHAE,
    하동: City.HADONG,
    산청: City.SANCHEONG,
    함양: City.HAMYANG,
    거창: City.GEOCHANG,
    합천: City.HAPCHEON,
  },
  제주특별자치도: {
    제주시: City.JEJU,
    서귀포시: City.SEOGWIPO,
  },
  충청북도: {
    청주: City.CHEONGJU,
    충주: City.CHUNGJU,
    제천: City.JECHEON,
    보은: City.BOEUN,
    옥천: City.OKCHEON,
    영동: City.YEONGDONG,
    증평: City.JEUNGPYEONG,
    진천: City.JINCHEON,
    괴산: City.GOESAN,
    음성: City.EUMSEONG,
    단양: City.DANYANG,
  },
  충청남도: {
    천안: City.CHEONAN,
    공주: City.GONGJU,
    보령: City.BORYEONG,
    아산: City.ASAN,
    서산: City.SEOSAN,
    논산: City.NONSAN,
    계룡: City.GYEORYONG,
    당진: City.DANGJIN,
    금산: City.GUMSAN,
    부여: City.BUYEON,
    서천: City.SEOCHEON,
    청양: City.CHEONGYANG,
    홍성: City.HONGSEONG,
    예산: City.YESAN,
    태안: City.TAEAN,
  },
  전라북도: {
    전주: City.JEONJU,
    군산: City.GUNSAN,
    익산: City.IKSAN,
    정읍: City.JEONGEUP,
    남원: City.NAMWON,
    김제: City.GIMJE,
    완주: City.WANJU,
    진안: City.JINAN,
    무주: City.MUJU,
    장수: City.JANGSU,
    임실: City.IMSIL,
    순창: City.SUNCHANG,
    고창: City.GOCHANG,
    부안: City.BUAN,
  },
  전라남도: {
    목포: City.MOKPO,
    여수: City.YEOSU,
    순천: City.SUNCHEON,
    나주: City.NAJU,
    광양: City.GWANGYANG,
    담양: City.DAMYANG,
    곡성: City.GOKSEONG,
    구례: City.GURYE,
    고흥: City.GOHEUNG,
    보성: City.BOSEONG,
    화순: City.HWASUN,
    장흥: City.JANGHEUNG,
    강진: City.GANGJIN,
    해남: City.HAENAM,
    영암: City.YEONGAM,
    무안: City.MUAN,
    함평: City.HAMPYEONG,
    영광: City.YEONGGWANG,
    장성: City.JANGSEONG,
    완도: City.WANDO,
    진도: City.JINDO,
    신안: City.SINAN,
  },
} as const;

export enum Region {
  GANGWON,
  GYEONGGI,
  GYEONGBUK,
  GYEONGNAM,
  JEONBUK,
  JEONNAM,
  CHUNGBUK,
  CHUNGANG,
  SEOUL,
  INCHEON,
  DAEGU,
  DAEJEON,
  SEJONG,
  BUSAN,
  GWANGJU,
  ULSAN,
  JEJU,
}
