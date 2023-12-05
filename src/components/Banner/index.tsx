import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faPlay } from '@fortawesome/free-solid-svg-icons';
import { useRecoilValue } from 'recoil';
import { useState, memo } from 'react'

import { PortalModal, DetailView, SimpleView } from '../../components';
import { MovieCategory, TvCategory } from '../../constants';
import { atomOfContentData } from '../../global'
import { formatImagePath } from '../../utils';
import * as S from './style';

interface IBanner {
  kind: MovieCategory | TvCategory;
}

function Banner({ kind }: IBanner) {
  // console.log('banner')
  const contentData = useRecoilValue(atomOfContentData);
  const [detailState, setDetailState] = useState(false);
  const [videoState, setVideoState] = useState(false);

  const showDetail = () => {
    if (!contentData?.id) return;
    setDetailState(true);
  }

  const closeDetail = () => {
    setDetailState(false);
  }

  const showVideo = () => {
    setVideoState(true);
  }

  const clostVideo = () => {
    setVideoState(false);
  }

  return (
    <>
      <S.Banner bgphoto={formatImagePath(contentData.backdrop_path)}>
        <S.Wrapper>
          <S.Title>{kind <= 20 ? contentData.title : contentData.name}</S.Title>
          <S.Overview>{contentData.overview}</S.Overview>
          <S.ButtonWrapper>
            <S.BannerButton onClick={showVideo}>
              <FontAwesomeIcon icon={faPlay} />
              <span>Play</span>
            </S.BannerButton>
            <S.BannerButton onClick={showDetail}>
              <FontAwesomeIcon icon={faInfoCircle} />
              <span>More Info</span>
            </S.BannerButton>
          </S.ButtonWrapper>
        </S.Wrapper>
      </S.Banner>
      
      {detailState && 
        <PortalModal>
          <DetailView kind={kind} data={contentData} closeDetail={closeDetail} onBanner={true} />
        </PortalModal>}
      
      {videoState &&
        <PortalModal>
          <SimpleView contentData={contentData} kind={kind} closeSimple={clostVideo} />
        </PortalModal>}
    </>
  )
}

export default memo(Banner);
