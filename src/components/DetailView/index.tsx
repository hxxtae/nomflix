import { faPlay, faThumbsDown, faThumbsUp, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useViewportScroll } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRecoilState } from 'recoil';

import { formatImagePath } from '../../utils';
import { api, dto, query } from '../../apis';
import { DetailViewState } from '../../global';
import { queryKey } from '../../constants';
import * as S from './style';

interface IDetailView {
  data: dto.IData;
  kind: number;
};

function DetailView({ data, kind }: IDetailView) {
  const [detailState, setDetailState] = useRecoilState(DetailViewState);
  const { isLoading, data: detailData } = query.useDetailDataFetch(queryKey.detail.all, () => api.getDetail(detailState.id, kind));
  const { scrollY } = useViewportScroll();

  const closeView = (e: any) => {
    setDetailState((prev) => ({
      ...prev,
      state: false,
      id: ''
    }))
  };
  
  return (
      <>
        <S.Section
          layoutId={detailState.id + kind.toString()}
          scrolly={scrollY}
        >
          <S.ContentHeader bgphoto={formatImagePath(data.backdrop_path)} />
          <S.ContentWrapper>
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
                <S.Content>
                  {detailData?.production_companies.map((item, index) => (
                    <div key={index.toString()}>
                      <img src={formatImagePath(item.logo_path, 'w500')} alt={item.name} />
                    </div>
                  ))}
                </S.Content>
                <S.Content>
                  {detailData?.production_companies.map((item, index) => (
                    <span key={index.toString()}>{item.name}</span>
                  ))}
                </S.Content>
              </>
            }
          </S.ContentWrapper>
        </S.Section>
        <S.Overlay
          onClick={closeView}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>
        </S.Overlay>
      </>
  )
}

export default DetailView;

// NOTE: how to use query string.
// const location = useLocation();
// const parsed = queryString.parse(location.search);
// const locationChk = parsed ? parsed.slider : null;