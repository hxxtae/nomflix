import { faPlay, faThumbsDown, faThumbsUp, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useViewportScroll } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { formatImagePath } from '../../utils';
import { api, dto, query } from '../../apis';
import { queryKey } from '../../constants';
import * as S from './style';
import { useEffect } from 'react';

interface IDetailView {
  data: dto.IData;
  kind: number;
  closeDetail: () => void;
};

function DetailView({ data, kind, closeDetail }: IDetailView) {
  const { isLoading, data: detailData } = query.useDetailDataFetch(queryKey.detail.all, () => api.getDetail(data.id + "", kind));
  const { scrollY } = useViewportScroll();

  // layoutId Bug Issue Link : https://github.com/framer/motion/issues/1580
  
  return (
    <S.Wrapper>
        <S.Section
          layoutId={data.id + kind.toString()}
          scrolly={scrollY}>
          <S.Image bgphoto={formatImagePath(data.backdrop_path)} />
          <S.Content>
            <S.Title>{data.title || data.original_title}</S.Title>
            <S.ButtonGroup>
              <button>
                <span>재생</span>
                <FontAwesomeIcon icon={faPlay} size="1x" />
              </button>
              <button>
                <FontAwesomeIcon icon={faThumbsUp} size="1x" />
              </button>
              <button>
                <FontAwesomeIcon icon={faThumbsDown} size="1x" />
              </button>
              <button>
                <FontAwesomeIcon icon={faPlus} size="1x" />
              </button>
            </S.ButtonGroup>
            <S.Overview>{data.overview}</S.Overview>
            {isLoading ||
              <>
                <S.Production>
                  {detailData?.production_companies.map((item, index) => (
                    <div key={index.toString()}>
                      <img src={formatImagePath(item.logo_path, 'w500')} alt={item.name} />
                    </div>
                  ))}
                </S.Production>
                <S.Production>
                  {detailData?.production_companies.map((item, index) => (
                    <span key={index.toString()}>{item.name}</span>
                  ))}
                </S.Production>
              </>
            }
          </S.Content>
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