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
  console.log(`sliderItem: ${kind}`)
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
          <button>
            <FontAwesomeIcon icon={faPlay} size="1x" />
          </button>
          <button>
            <FontAwesomeIcon icon={faThumbsUp} size="1x" />
          </button>
          <button>
            <FontAwesomeIcon icon={faThumbsDown} size="1x" />
          </button>
          <button>
            <FontAwesomeIcon icon={faPlus} size="1x" />
          </button>
        </S.ButtonGroup>
        <span>{data.title || data.name}</span>
      </S.Info>
    </S.Box>
  )
}

export default memo(SliderItem);
