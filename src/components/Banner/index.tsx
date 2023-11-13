import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useRecoilValue } from 'recoil';
import { useState, memo } from 'react'

import { Loading, PortalModal, DetailView } from '../../components';
import { MovieCategory, TvCategory } from '../../constants';
import { atomOfContentData } from '../../global'
import { formatImagePath } from '../../utils';
import * as S from './style';

interface IBanner {
  kind: MovieCategory | TvCategory;
}

function Banner({ kind }: IBanner) {
  console.log('banner')
  const contentData = useRecoilValue(atomOfContentData);
  const [detailState, setDetailState] = useState(false);

  const showDetail = () => {
    if (!contentData?.id) return;
    setDetailState(true);
  }

  const closeDetail = () => {
    setDetailState(false);
  }

  return (
    <>
      {contentData.id ?
        <S.Banner bgphoto={formatImagePath(contentData.backdrop_path)}>
          <S.Title>{contentData.title}</S.Title>
          <S.ButtonWrapper>
            <S.BannerButton>
              <FontAwesomeIcon icon={faPlay} /><span>재생</span>
            </S.BannerButton>
            <S.BannerButton onClick={showDetail}>
              <FontAwesomeIcon icon={faPlus} /><span>상세 정보</span>
            </S.BannerButton>
          </S.ButtonWrapper>
          <S.Overview>{contentData.overview}</S.Overview>
        </S.Banner>
        : <Loading />}
      
      {detailState && 
        <PortalModal>
          <DetailView kind={kind} data={contentData} closeDetail={closeDetail} onBanner={true} />
        </PortalModal>}
    </>
  )
}

export default memo(Banner);
