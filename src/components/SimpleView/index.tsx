import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';

import { useContentDetailFetch } from '../../hooks';
import { videosKeySorting } from '../../utils';
import { queryKey } from '../../constants';
import { api, dto } from '../../apis';
import * as S from './style';
import Loading from '../Loading';
import VideoPlayer from '../VideoPlayer';

interface ISimpleView {
  contentData: dto.IContentData;
  kind: number;
  closeSimple: () => void;
}

function SimpleView({ contentData, kind, closeSimple }: ISimpleView) {
  const queryKeyOfDetail = queryKey.detail.content(contentData.id.toString());
  const queryFuncOfDetail = () => api.getDetail(contentData.id.toString(), kind);
  const { isLoading, data } = useContentDetailFetch(queryKeyOfDetail, queryFuncOfDetail);

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
      <S.Close onClick={closeSimple}><FontAwesomeIcon icon={faClose} /></S.Close>
      <S.Section>
        {!isLoading ? <VideoPlayer videoKey={videosKeySorting(data?.videos.results)} inset={false} /> : <Loading />}
      </S.Section>

      <S.Overlay
        onClick={closeSimple}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: {duration: 1} }}
        exit={{ opacity: 0 }}
      />
    </S.Wrapper>
  )
}

export default SimpleView;
