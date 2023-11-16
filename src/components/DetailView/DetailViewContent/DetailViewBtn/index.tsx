import { faPlay, faThumbsUp, faPlus, faHeart, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRecoilValue } from 'recoil';
import { motion } from 'framer-motion';

import { atomOfMylistData } from '../../../../global';
import { dto } from '../../../../apis';
import * as S from './style';

interface IDetailViewBtn {
  detailData?: dto.IContentDetailsData;
  onFavorit: () => void;
  showVideoHandle: () => void;
}

function DetailViewBtn({ detailData, onFavorit, showVideoHandle }: IDetailViewBtn) {
  const mylistDatas = useRecoilValue(atomOfMylistData);

  const formatOfNum = (num: number = 0) => {
    return parseInt(num.toString(), 10);
  }

  return (
    <S.ButtonGroup>
      <S.Play type='button' onClick={showVideoHandle}>
        <FontAwesomeIcon icon={faPlay} size="1x" />
        <span>Play</span>
      </S.Play>

      <S.Favorit type='button' onClick={onFavorit}>
        <motion.i key={mylistDatas.get(formatOfNum(detailData?.id)) ? 1 : 2} { ...S.iconAniProps }>
          <FontAwesomeIcon icon={mylistDatas.get(formatOfNum(detailData?.id)) ? faCheck : faPlus} size="1x" />
        </motion.i>
      </S.Favorit>

      <S.Like type='button'>
        <FontAwesomeIcon icon={faThumbsUp} size="1x" />
      </S.Like>

      <S.Popular>
        <FontAwesomeIcon icon={faHeart} size='1x'/>
        <span>{formatOfNum(detailData?.popularity)}</span>
      </S.Popular>
    </S.ButtonGroup>
  )
}

export default DetailViewBtn;
