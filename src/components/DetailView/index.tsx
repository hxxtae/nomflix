import { api, dto } from '../../apis';
import { queryKey } from '../../constants';
import { formatImagePath } from '../../utils';
import { useContentFetch, useContentDetailFetch } from '../../hooks';
import * as S from './style';
import DetailViewContent from './DetailViewContent';

interface IDetailView {
  data: dto.IContentData;
  kind: number;
  closeDetail: () => void;
};

const popularSorting = (datas?: dto.IContentData[]) => {
  return datas
    ?.sort(({ popularity: a }, { popularity: b }) => Math.floor(b) - Math.floor(a))
    .slice(0, 9);
}

function DetailView({ data, kind, closeDetail }: IDetailView) {
  const { isLoading: isDetailLoading, data: detailData } = useContentDetailFetch(queryKey.detail.all, () => api.getDetail(data.id.toString(), kind));
  const queryKeyStata = kind < 20 ?
    queryKey.movie.similar(data.id.toString()) :
    queryKey.tv.similar(data.id.toString());
  const queryFuncState = kind < 20 ?
    () => api.getMovieSimilarAll(data.id.toString()) :
    () => api.getTvSimilarAll(data.id.toString());
  const { isLoading: isSimilarLoading, datas: similarData } = useContentFetch(queryKeyStata, queryFuncState);

  const isLoading = isDetailLoading || isSimilarLoading;
  
  return (
    <S.Wrapper>
      <S.Section
        layoutId={data.id + kind.toString()}>
        <S.Image bgphoto={formatImagePath(data.backdrop_path)} />
        {isLoading || <DetailViewContent detailData={detailData} similarData={popularSorting(similarData)} />}
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