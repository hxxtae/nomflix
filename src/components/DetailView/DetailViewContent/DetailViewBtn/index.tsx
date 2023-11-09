import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faThumbsUp, faPlus, faHeart } from "@fortawesome/free-solid-svg-icons";

import * as S from './style';

interface IDetailViewBtn {
  popularity: number;
  showVideoHandle: () => void;
}

function DetailViewBtn({ popularity, showVideoHandle }: IDetailViewBtn) {

  return (
    <S.ButtonGroup>
      <button type='button' onClick={showVideoHandle}>
        <span>재생</span>
        <FontAwesomeIcon icon={faPlay} size="1x" />
      </button>
      <button type='button'>
        <FontAwesomeIcon icon={faThumbsUp} size="1x" />
      </button>
      <button type='button'>
        <FontAwesomeIcon icon={faPlus} size="1x" />
      </button>
      <S.Popular>
        <FontAwesomeIcon icon={faHeart} size='1x'/>
        <span>{popularity}</span>
      </S.Popular>
    </S.ButtonGroup>
  )
}

export default DetailViewBtn;
