import { dto } from '../../../../../apis';
import { formatImagePath, publicUrlStr } from '../../../../../utils';

import * as S from './style';

interface ISliderRankItem {
  data: dto.IContentData;
  kind: number;
  rank: number;
  detailClick: (content: dto.IContentData) => void;
}

function SliderRankItem({ data, kind, rank, detailClick }: ISliderRankItem) {
  return (
    <S.Box layoutId={data.id + kind.toString()} onClick={() => detailClick(data)}>
      <S.Wrapper>
        <S.Rank>
          <img src={`${publicUrlStr()}/assets/svg/rank_${rank + 1}.svg`} alt={`rank_${rank + 1}`}/>
        </S.Rank>
        <S.Poster>
          <img src={formatImagePath(data.poster_path)} alt={data.poster_path} />
          </S.Poster>
      </S.Wrapper>
    </S.Box>
  )
}

export default SliderRankItem;
