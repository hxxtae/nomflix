import { faPlay, faThumbsUp, faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRecoilState } from 'recoil';
import { memo } from 'react';
import { motion } from 'framer-motion';

import { dto } from '../../../../../apis';
import { useMediaQuery } from '../../../../../hooks';
import { atomOfMylistData } from '../../../../../global';
import { MovieCategory, TvCategory, mediaScreenSize } from '../../../../../constants';
import { addContentStorage, deleteContentStorage, formatImagePath } from '../../../../../utils';
import * as S from './style';
import { AnimatePresence } from 'framer-motion';

interface ISliderItem {
  data: dto.IContentData;
  kind: number;
  detailClick: (content: dto.IContentData) => void;
}

function SliderItem({ data, kind, detailClick }: ISliderItem) {
  const [mylistDatas, setMylistDatas] = useRecoilState(atomOfMylistData);
  const tablet = useMediaQuery(`(max-width: ${mediaScreenSize.tablet.MAX}px)`);

  // NOTE: 콘텐츠 영상 재생 팝업 이벤트
  const onPlay = (e: any) => {
    e.stopPropagation();
    console.log('Click Play Button');
  }

  // NOTE: 콘텐츠 즐겨찾기 이벤트
  const onFavorit = (e: React.MouseEvent, data: dto.IContentData) => {
    e.stopPropagation();
    setMylistDatas((prev) => {
      if (prev.get(data.id)) {
        // [Delete]: 스토리지에 해당 콘텐츠 삭제
        return deleteContentStorage('mylist', data.id);
      }
      // [Add]: 스토리지에 해당 콘텐츠 추가
      let setKind;
      if (kind < 20) setKind = MovieCategory.Mylist;
      else if (kind < 30) setKind = TvCategory.Mylist;
      return addContentStorage('mylist', { ...data, kind: setKind });
    })
  }

  // NOTE: 콘텐츠 추천 이벤트
  const onRecommend = (e: any) => {
    e.stopPropagation();
    console.log('Click Recommend Button');
  }

  return (
    <S.Box
      layoutId={data.id + kind.toString()}
      onClick={() => detailClick(data)}
      variants={S.boxHoverVariants(tablet)}
      whileHover="hover"
      transition={{ type: "tween" }}>
      <S.BoxImg variants={S.imageHoverVariants(tablet)} src={formatImagePath(data.backdrop_path, 'w500')} />
      <S.Info variants={S.infoHoverVariants(tablet)}>
        <AnimatePresence>
          <S.ButtonGroup>
            <button type='button' onClick={onPlay}>
              <FontAwesomeIcon icon={faPlay} size="1x" />
            </button>
            <button type='button' onClick={(e) => onFavorit(e, data)}>
              <motion.i
                key={mylistDatas.get(data.id) ? 1 : 2}
                { ...S.iconAniProps }>
                <FontAwesomeIcon icon={mylistDatas.get(data.id) ? faCheck : faPlus} size="1x" />
              </motion.i>
            </button>
            <button type='button' onClick={onRecommend}>
              <FontAwesomeIcon icon={faThumbsUp} size="1x" />
            </button>
          </S.ButtonGroup>
        </AnimatePresence>
        <span>{data.title || data.name}</span>
      </S.Info>
    </S.Box>
  )
}

export default memo(SliderItem);
