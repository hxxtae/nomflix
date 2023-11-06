import { dto } from '../../../apis';
import { formatImagePath, toTime } from '../../../utils';
import DetailViewBtn from './DetailViewBtn';
import * as S from './style';

interface IDetailViewContent {
  detailData?: dto.IContentDetailsData;
  similarData?: dto.IContentData[];
}

function DetailViewContent({ detailData, similarData }: IDetailViewContent) {
  const showNumData = (num: number = 0) => {
    return parseInt(num.toString(), 10);
  }

  const showStrData = (data: unknown): string => {
    if (typeof data === 'string' && data) return data;
    if (typeof data === 'number') return data.toString();

    return '-';
  }

  const showArrData = <T extends dto.ICompany | dto.IGenres>(arr?: T[]) => {
    if (Array.isArray(arr) && arr.length > 0) {
      return arr.map(item => (<span key={item.id}>{item.name}</span>))
    };

    return '-';
  }

  return (
    <S.Content>
      <S.Title>{detailData?.title || detailData?.name}</S.Title>
      <DetailViewBtn popularity={showNumData(detailData?.popularity)} />
      <S.Overview>{showStrData(detailData?.overview)}</S.Overview>

      <S.SubTitle>Similar Contents</S.SubTitle>
      <S.ImageBox>
        {similarData?.map(data => (
          data.poster_path ?
          <img key={data.id} src={formatImagePath(data.poster_path, 'w200')} alt={data.poster_path} /> : null
        ))}
      </S.ImageBox>

      <S.SubTitle>{showStrData(detailData?.title ?? detailData?.name)} Information</S.SubTitle>
      <S.Info>
        <strong>Productions: </strong>
        {showArrData(detailData?.production_companies)}
      </S.Info>
      <S.Info>
        <strong>Genres: </strong>
        {showArrData(detailData?.genres)}
      </S.Info>
      <S.Info>
        <strong>Original Name: </strong>
        <span>{showStrData(detailData?.original_title ?? detailData?.original_name)}</span>
      </S.Info>
      <S.Info>
        <strong>Release Date: </strong>
        <span>{showStrData(detailData?.release_date ?? detailData?.first_air_date)}</span>
      </S.Info>
      <S.Info>
        <strong>Run Time: </strong>
        <span>{toTime(detailData?.runtime)}</span>
      </S.Info>
      <S.Info>
        <strong>Status: </strong>
        <span>{showStrData(detailData?.status)}</span>
      </S.Info>
    </S.Content>
  )
}

export default DetailViewContent;
