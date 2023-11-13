import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faLeftLong } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

import { api, dto } from '../../apis';
import { queryKey } from '../../constants';
import { formatImagePath } from '../../utils';
import { VideoPlayer } from '../../components';
import { useContentFetch, useContentDetailFetch } from '../../hooks';
import * as S from './style';
import DetailViewContent from './DetailViewContent';

interface IDetailView {
  data: dto.IContentData;
  kind: number;
  closeDetail: () => void;
  onBanner?: boolean;
};

// Similar 필터링 및 정렬 함수
const popularContentSorting = (datas?: dto.IContentData[]) => {
  return datas
    ?.sort(({ popularity: a }, { popularity: b }) => Math.floor(b) - Math.floor(a))
    .slice(0, 9);
}

// Videos 필터링 함수
const videosKeySorting = (datas?: dto.IVideos[]) => {
  if (!datas?.length) return;

  const videos = datas.filter(item => item.type === "Trailer");
  if (!videos.length) return datas[datas.length - 1].key;
  return videos[videos.length - 1].key;
}

function DetailView({ data, kind, closeDetail, onBanner }: IDetailView) {
  const [contentData, setContentData] = useState<dto.IContentData>(data);
  const [videoShowState, setVideoShowState] = useState(false);
  const [contentHistory, setContentHistory] = useState<dto.IContentData[]>([]);

  // Content-Detail Fetch
  const queryKeyOfDetail = queryKey.detail.content(contentData.id.toString());
  const queryFuncOfDetail = () => api.getDetail(contentData.id.toString(), kind);
  const { isLoading: isDetailLoading, data: detailData } = useContentDetailFetch(queryKeyOfDetail, queryFuncOfDetail);

  // Content(Similar) Fetch
  const queryKeyStata = kind < 20 ?
    queryKey.movie.similar(contentData.id.toString()) :
    queryKey.tv.similar(contentData.id.toString());
  const queryFuncState = kind < 20 ?
    () => api.getMovieSimilarAll(contentData.id.toString()) :
    () => api.getTvSimilarAll(contentData.id.toString());
  const { isLoading: isSimilarLoading, datas: similarData } = useContentFetch(queryKeyStata, queryFuncState);

  const isLoading = isDetailLoading || isSimilarLoading;

  const showSimilarContent = (data: dto.IContentData) => {
    setVideoShowState(false);
    setContentData(() => ({
      ...data
    }));
    setContentHistory((prev) => {
      prev.push(contentData);
      return prev;
    });
  }

  const onPrevClick = () => {
    if (contentHistory.length === 0) return;
    const prevData = contentHistory[contentHistory.length - 1];
    setVideoShowState(false);
    setContentData(() => ({
      ...prevData
    }));
    setContentHistory((prev) => {
      prev.pop();
      return prev;
    });
  }

  const showVideoHandle = () => {
    if (!detailData?.videos?.results.length) {
      alert('현재 지원하는 영상이 없습니다.');
      return;
    }
    setVideoShowState(true);
  }

  const onForBannerStyle = (state?: boolean) => {
    const styles = state ? {
      variants: S.onBannerVariants,
      initial: "hidden",
      animate: "visible",
      exit: "exit"
    } : null;

    return { ...styles };
  }

  useEffect(() => {
    const $body = document.querySelector('body');
    if (!$body) return;

    $body.style.overflowY = 'hidden';
    return () => {
      $body.style.overflowY = 'auto';
    }
  }, [data]);
  
  return (
    <S.Wrapper>
      <S.Section
        className={`detail`}
        layoutId={contentData.id + kind.toString()}
        {...onForBannerStyle(onBanner)}>
        <S.Close onClick={closeDetail}><FontAwesomeIcon icon={faClose} /></S.Close>
        {contentHistory.length ? <S.Prev onClick={onPrevClick}><FontAwesomeIcon icon={faLeftLong} /></S.Prev> : null}
        <S.Image bgphoto={formatImagePath(contentData.backdrop_path)} />
        {videoShowState ? <VideoPlayer videoKey={videosKeySorting(detailData?.videos.results)} /> : null}
        <DetailViewContent
          loading={isLoading}
          detailData={detailData}
          similarData={popularContentSorting(similarData)}
          showSimilarContent={showSimilarContent}
          showVideoHandle={showVideoHandle}
          videoShowState={videoShowState}
        />
      </S.Section>
      
      <S.Overlay
        onClick={closeDetail}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}>
      </S.Overlay>
    </S.Wrapper>
  )
}

export default DetailView;

// NOTE: how to use query string.
// const location = useLocation();
// const parsed = queryString.parse(location.search);
// const locationChk = parsed ? parsed.slider : null;