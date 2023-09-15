import { faPlay, faThumbsDown, faThumbsUp, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';

import { formatImagePath } from '../../../../utils';
import { dto } from '../../../../apis';
import * as S from './style';

interface ISliderItem {
  data: dto.IData;
  kind: number;
  detailClick: (contentId: string) => void;
}

function SliderItem({ data, kind, detailClick }: ISliderItem) {
  // console.log(`sliderItem: ${kind}`)

  const onPlay = (e: any) => {
    e.stopPropagation();
    console.log('Click Play Button');
  }

  const onRecommend = (e: any) => {
    e.stopPropagation();
    console.log('Click Recommend Button');
  }

  const onNotRecommend = (e: any) => {
    e.stopPropagation();
    console.log('Click Not Recommend Button');
  }

  const onSubscribe = (e: any) => {
    e.stopPropagation();
    console.log('Click Subscribe Button');
  }

  return (
    <S.Box
      layoutId={data.id + kind.toString()}
      onClick={() => detailClick(data.id.toString())}
      variants={S.boxHoverVariants}
      whileHover="hover"
      transition={{ type: "tween" }}>
      <S.BoxImg src={formatImagePath(data.backdrop_path, 'w500')} />
      <S.Info variants={S.infoHoverVariants}>
        <S.ButtonGroup>
          <button type='button' onClick={onPlay}>
            <FontAwesomeIcon icon={faPlay} size="1x" />
          </button>
          <button type='button' onClick={onRecommend}>
            <FontAwesomeIcon icon={faThumbsUp} size="1x" />
          </button>
          <button type='button' onClick={onNotRecommend}>
            <FontAwesomeIcon icon={faThumbsDown} size="1x" />
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
