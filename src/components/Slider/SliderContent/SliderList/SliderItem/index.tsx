import { faPlay, faThumbsUp, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';

import { useMediaQuery } from '../../../../../hooks';
import { formatImagePath } from '../../../../../utils';
import { dto } from '../../../../../apis';
import { mediaScreenSize } from '../../../../../constants';
import * as S from './style';

interface ISliderItem {
  data: dto.IContentData;
  kind: number;
  detailClick: (content: dto.IContentData) => void;
}

function SliderItem({ data, kind, detailClick }: ISliderItem) {
  const tablet = useMediaQuery(`(max-width: ${mediaScreenSize.tablet.MAX}px)`);

  const onPlay = (e: any) => {
    e.stopPropagation();
    console.log('Click Play Button');
  }

  const onRecommend = (e: any) => {
    e.stopPropagation();
    console.log('Click Recommend Button');
  }

  const onSubscribe = (e: any) => {
    e.stopPropagation();
    console.log('Click Subscribe Button');
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
        <S.ButtonGroup>
          <button type='button' onClick={onPlay}>
            <FontAwesomeIcon icon={faPlay} size="1x" />
          </button>
          <button type='button' onClick={onRecommend}>
            <FontAwesomeIcon icon={faThumbsUp} size="1x" />
          </button>
          <button type='button' onClick={onSubscribe}>
            <FontAwesomeIcon icon={faPlus} size="1x" />
          </button>
        </S.ButtonGroup>
        <span>{data.title || data.name}</span>
      </S.Info>
    </S.Box>
  )
}

export default memo(SliderItem);
