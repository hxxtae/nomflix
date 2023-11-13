import { useEffect } from 'react';

import { dto } from '../../../apis';
import { formatImagePath, toTime } from '../../../utils';
import { Skeleton, SkeletonPost } from '../../../components';
import * as S from './style';
import DetailViewBtn from './DetailViewBtn';

interface IDetailViewContent {
  loading: boolean;
  detailData?: dto.IContentDetailsData;
  similarData?: dto.IContentData[];
  showSimilarContent: (data: dto.IContentData) => void;
  showVideoHandle: () => void;
  videoShowState: boolean;
}

function DetailViewContent({ loading, detailData, similarData, showSimilarContent, showVideoHandle, videoShowState }: IDetailViewContent) {
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

  useEffect(() => {
    const $detail = document.querySelector('.detail');
    if (!$detail) return;
    $detail.scrollTo(0, 0);
  }, [detailData]);

  return (
    <S.Content videoShow={videoShowState}>
      {/* Section - 1 */}
      <S.Title>{!loading ? (detailData?.title ?? detailData?.name) : <Skeleton classes='title-1 width-50' />}</S.Title>
      {!loading ? <DetailViewBtn popularity={formatOfNum(detailData?.popularity)} showVideoHandle={showVideoHandle} /> : <Skeleton classes='title-1 width-25' />}
      <S.Overview>{!loading ? formatOfStr(detailData?.overview) : <SkeletonPost />}</S.Overview>

      {/* Section - 2 */}
      <S.SubTitle>Similar Contents</S.SubTitle>
      <S.ImageBox>
        {!loading ? (similarData?.map(data => (
          data.poster_path ?
            <img
              key={data.id}
              src={formatImagePath(data.poster_path, 'w200')}
              onClick={() => showSimilarContent(data)}
              alt={data.title || data.name} /> :
            null
        ))) :
          Array.from({ length: 9 }, (_, i) => <Skeleton key={i + 1} classes='grid' />)}
      </S.ImageBox>

      {/* Section - 3 */}
      <S.SubTitle>About {detailData?.title ?? detailData?.name}</S.SubTitle>
      {!loading ? <S.InfoBox>
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
      </S.Info></S.InfoBox> : <SkeletonPost />}
    </S.Content>
  )
}

export default DetailViewContent;
