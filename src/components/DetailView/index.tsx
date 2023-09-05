import { faPlay, faThumbsDown, faThumbsUp, faPlus } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, useViewportScroll } from 'framer-motion';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { formatImagePath, publicUrlStr } from '../../utils';
import { api, dto, query } from '../../apis';
import { queryKey } from '../../constants';
import * as S from './style';

interface IDetailView {
  data: dto.IData;
  kind: number;
};

function DetailView({ data, kind }: IDetailView) {
  const detailMatch = useRouteMatch<{ movieId: string, tvId: string }>([`${publicUrlStr()}/movies/:movieId`, `${publicUrlStr()}/tv/:tvId`]);
  const { isLoading, data: detailData } = query.useDetailDataFetch(queryKey.detail.all, () => api.getDetail(detailMatch?.params.movieId, detailMatch?.params.tvId));
  const { scrollY } = useViewportScroll();
  const history = useHistory();

  const closeBigMovie = () => {
    if (detailMatch?.params.movieId) {
      history.push(`${publicUrlStr()}`);
    } else if (detailMatch?.params.tvId) {
      history.push(`${publicUrlStr()}/tv`);
    }
  };
  
  return (
    <AnimatePresence>
        <>
          <S.Overlay
            onClick={closeBigMovie}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
          </S.Overlay>
          <S.BigContent
            layoutId={(detailMatch?.params.movieId || detailMatch?.params.tvId) + kind.toString()}
            scrolly={scrollY}
          >
            <S.BigCover bgPhoto={formatImagePath(data.backdrop_path)} />
            <S.BigWrapper>
              <S.BigTitle>{data.title || data.original_title}</S.BigTitle>
              <S.BigButtonGroup>
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
              </S.BigButtonGroup>
              <S.BigOverview>{data.overview}</S.BigOverview>
              {isLoading ||
                <>
                  <S.BigDetail>
                    {detailData?.production_companies.map((item, index) => (
                      <div key={index.toString()}>
                        <img src={formatImagePath(item.logo_path, 'w500')} alt={item.name} />
                      </div>
                    ))}
                  </S.BigDetail>
                  <S.BigDetail>
                    {detailData?.production_companies.map((item, index) => (
                      <span key={index.toString()}>{item.name}</span>
                    ))}
                  </S.BigDetail>
                </>
              }
            </S.BigWrapper>
          </S.BigContent>
        </>
    </AnimatePresence > 
  )
}

export default DetailView;

// NOTE: how to use query string.
// const location = useLocation();
// const parsed = queryString.parse(location.search);
// const locationChk = parsed ? parsed.slider : null;