import { dto } from '../../../apis';
import { formatImagePath, toTime } from '../../../utils';
import * as S from './style';
import DetailViewBtn from './DetailViewBtn';
import Skeleton from '../../Skeleton';
import SkeletonPost from '../../SkeletonPost';

interface IDetailViewContent {
  loading: boolean;
  detailData?: dto.IContentDetailsData;
  similarData?: dto.IContentData[];
}

function DetailViewContent({ loading, detailData, similarData }: IDetailViewContent) {
  const formatOfNum = (num: number = 0) => {
    return parseInt(num.toString(), 10);
  }

  const formatOfStr = (data: unknown): string => {
    if (typeof data === 'string' && data) return data;
    if (typeof data === 'number') return data.toString();

    return '-';
  }

  const formatOfArr = <T extends dto.ICompany | dto.IGenres>(arr?: T[]) => {
    if (Array.isArray(arr) && arr.length > 0) {
      return arr.map(item => (<span key={item.id}>{item.name}</span>))
    };

    return '-';
  }

  return (
    <S.Content>
      {/* Section - 1 */}
      <S.Title>{!loading ? (detailData?.title ?? detailData?.name) : <Skeleton classes='title-1 width-50' />}</S.Title>
      {!loading ? <DetailViewBtn popularity={formatOfNum(detailData?.popularity)} /> : <Skeleton classes='title-1 width-25' />}
      <S.Overview>{!loading ? formatOfStr(detailData?.overview) : <SkeletonPost />}</S.Overview>

      {/* Section - 2 */}
      <S.SubTitle>Similar Contents</S.SubTitle>
      <S.ImageBox>
        {!loading ? (similarData?.map(data => (
          data.poster_path ?
            <img key={data.id} src={formatImagePath(data.poster_path, 'w200')} alt={data.poster_path} /> :
            null
        ))) :
          Array.from({ length: 9 }, (_, i) => <Skeleton key={i + 1} classes='grid' />)}
      </S.ImageBox>

      {/* Section - 3 */}
      <S.SubTitle>{formatOfStr(detailData?.title ?? detailData?.name)} Information</S.SubTitle>
      {!loading ? <>
        <S.Info>
        <strong>Productions: </strong>
        {formatOfArr(detailData?.production_companies)}
      </S.Info>
      <S.Info>
        <strong>Genres: </strong>
        {formatOfArr(detailData?.genres)}
      </S.Info>
      <S.Info>
        <strong>Original Name: </strong>
        <span>{formatOfStr(detailData?.original_title ?? detailData?.original_name)}</span>
      </S.Info>
      <S.Info>
        <strong>Release Date: </strong>
        <span>{formatOfStr(detailData?.release_date ?? detailData?.first_air_date)}</span>
      </S.Info>
      <S.Info>
        <strong>Run Time: </strong>
        <span>{toTime(detailData?.runtime)}</span>
      </S.Info>
      <S.Info>
        <strong>Status: </strong>
        <span>{formatOfStr(detailData?.status)}</span>
      </S.Info></> : <SkeletonPost />}
    </S.Content>
  )
}

export default DetailViewContent;
