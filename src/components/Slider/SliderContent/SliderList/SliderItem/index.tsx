import { faPlay, faThumbsUp, faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence } from 'framer-motion';
import { useRecoilState } from 'recoil';
import { motion } from 'framer-motion';
import { memo, useRef, useState, useEffect } from 'react';

import { dto } from '../../../../../apis';
import { useMediaQuery } from '../../../../../hooks';
import { atomOfMylistData } from '../../../../../global';
import { MovieCategory, TvCategory, mediaScreenSize } from '../../../../../constants';
import { addContentStorage, deleteContentStorage, formatImagePath, genresFormat } from '../../../../../utils';
import * as S from './style';
import SimpleView from '../../../../SimpleView';
import PortalModal from '../../../../PortalModal';

interface ISliderItem {
  data: dto.IContentData;
  kind: number;
  detailClick: (content: dto.IContentData) => void;
}

function SliderItem({ data, kind, detailClick }: ISliderItem) {
  const [showVideo, setShowVideo] = useState(false);
  const [mylistDatas, setMylistDatas] = useRecoilState(atomOfMylistData);
  const genreRef = useRef<HTMLParagraphElement>(null);
  const tablet = useMediaQuery(`(max-width: ${mediaScreenSize.tablet.MAX}px)`);

  const formatOfPercent = (num?: string | number) => {
    if (typeof num === 'number' || typeof num === 'string') {
      return parseInt((+num * 10).toString(), 10);
    }
    return '-';
  }

  // NOTE: 콘텐츠 영상 재생 팝업 이벤트
  const onPlay = (e: any) => {
    e.stopPropagation();
    setShowVideo(true);
  }

  const closeVideo = () => {
    setShowVideo(false);
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

  useEffect(() => {
    const target = genreRef.current;
    if (!target) return;
    if (target.clientWidth < target.children[0].clientWidth) {
      target.children[0].classList.add('move');
    }
  }, []);

  return (
    <>
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
              <S.Play type='button' onClick={onPlay}>
                <FontAwesomeIcon icon={faPlay} size="1x" />
              </S.Play>
              <S.Favorit type='button' onClick={(e) => onFavorit(e, data)}>
                <motion.i
                  key={mylistDatas.get(data.id) ? 1 : 2}
                  { ...S.iconAniProps }>
                  <FontAwesomeIcon icon={mylistDatas.get(data.id) ? faCheck : faPlus} size="1x" />
                </motion.i>
              </S.Favorit>
              <S.Like type='button' onClick={onRecommend}>
                <FontAwesomeIcon icon={faThumbsUp} size="1x" />
              </S.Like>
            </S.ButtonGroup>
          </AnimatePresence>
          <S.Title>{data.title || data.name}</S.Title>
          <S.VoteAndGenre>
            <strong>{formatOfPercent(data.vote_average) + '% LIKES'}</strong>
            <p ref={genreRef}>
              <span>{genresFormat(data.genre_ids, kind, 3)}</span>
            </p>
          </S.VoteAndGenre>
        </S.Info>
      </S.Box>

      {showVideo && 
        <PortalModal>
          <SimpleView contentData={data} kind={kind} closeSimple={closeVideo} />
        </PortalModal>}
    </>
  )
}

export default memo(SliderItem);
