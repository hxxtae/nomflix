import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

import { api, dto } from '../../apis';
import { useContentFetch } from '../../hooks';
import { MovieCategory, TvCategory, initContentData, queryKey } from '../../constants';
import { DetailView, PortalModal } from '../../components';
import * as S from './style';
import Search404 from './Search404';
import SearchContent from './SearchContent';


function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword") || '';
  const [chooseContent, setChooseContent] = useState<dto.IContentData>(initContentData);
  const [chooseKind, setChooseKind] = useState<MovieCategory.Search | TvCategory.Search>(MovieCategory.Search);

  // Movie Search Fetch
  const queryKeyOfMovieSearch = queryKey.movie.search(keyword);
  const queryFuncOfMovieSearch = () => api.getMovieSearchAll(keyword);
  const { isLoading: isMovieLoading, datas: movieDatas } = useContentFetch(queryKeyOfMovieSearch, queryFuncOfMovieSearch);

  // Tv Search Fetch
  const queryKeyOfTvSearch = queryKey.tv.search(keyword);
  const queryFuncOfTvSearch = () => api.getTvSearchAll(keyword);
  const { isLoading: isTvLoading, datas: tvDatas } = useContentFetch(queryKeyOfTvSearch, queryFuncOfTvSearch);

  const isLoading = isMovieLoading || isTvLoading;

  const openMovieDetail = useCallback((content: dto.IContentData) => {
    if (!content?.id) return;
    setChooseKind(MovieCategory.Search);
    setChooseContent((prev) => ({
      ...prev,
      ...content
    }));
  }, []);

  const openTvDetail = useCallback((content: dto.IContentData) => {
    if (!content?.id) return;
    setChooseKind(TvCategory.Search);
    setChooseContent((prev) => ({
      ...prev,
      ...content
    }));
  }, []);

  const closeDetail = useCallback(() => {
    setChooseContent((prev) => ({
      ...prev,
      ...initContentData
    }));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AnimatePresence>
      <>
        <S.Wrapper>
          <SearchContent
            title='MOVIE'
            isLoading={isMovieLoading}
            datas={movieDatas}
            kind={MovieCategory.Search}
            detailClick={openMovieDetail} />
          <SearchContent
            title='SERIES'
            isLoading={isTvLoading}
            datas={tvDatas}
            kind={TvCategory.Search}
            detailClick={openTvDetail} />          
          {!isLoading && !movieDatas?.length && !tvDatas?.length &&
            <Search404 searchText={keyword} />}
        </S.Wrapper>
        
        {(!!chooseContent.id) && (
          <PortalModal>
            <DetailView data={chooseContent} kind={chooseKind} closeDetail={closeDetail} />
          </PortalModal>
        )}
      </>
    </AnimatePresence>
  );
}

export default Search;
