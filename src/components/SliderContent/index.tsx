import { useCallback, useState, useEffect } from 'react';
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useMediaQuery } from '../../hooks/useMediaQuery';
import { mediaScreenSize } from '../../constants';
import { dto } from '../../apis';
import DetailView from '../DetailView';
import SliderList from './SliderList';
import PortalModal from '../PortalModal';
import * as S from './style';

const initContentData: dto.IContentData = {
  adult: false,
  genre_ids: [],
  id: 0,
  name: '',
  original_language: '',
  original_title: '',
  original_name: '',
  popularity: 0,
  release_data: '',
  backdrop_path: '',
  poster_path: '',
  title: '',
  video: false,
  vote_average: 0,
  vote_count: 0,
  overview: '',
}

interface ISliderData {
  data: dto.IContentData[];
  kind: number;
  slider: number;
}

function SliderContent({ data, kind, slider }: ISliderData) {
  const [leaving, setLeaving] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(false);
  const [thisContent, setThisContent] = useState<dto.IContentData>(initContentData);
  const [offset, setOffset] = useState(6);
  const medium = useMediaQuery(`(max-width: ${mediaScreenSize.tablet.MAX}px)`);

  const openDetail = useCallback((contentId: string) => {
    const detailData = data?.find((item) => item.id.toString() === contentId);
    if (!detailData) return;
    setThisContent((prev) => ({
      ...prev,
      ...detailData
    }))
  }, [data]);

  const closeDetail = useCallback(() => {
    setThisContent((prev) => ({
      ...prev,
      ...initContentData
    }));
  }, []);

  const toggleCaraucel = useCallback(() =>
    setLeaving((prev) => !prev), []);

  const increaFunc = useCallback((data: dto.IContentData[]) => {
    if (leaving || !data?.length) return;
    const totalMovie = data.length - 1;
    const maxIndex = Math.floor(totalMovie / offset) - 1;
    toggleCaraucel();
    setSlideDirection(false);
    setSlideIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  }, [toggleCaraucel, leaving, offset]);

  const decreaFunc = useCallback((data: dto.IContentData[]) => {
    if (leaving || !data?.length) return;
    const totalMovie = data.length - 1;
    const maxIndex = Math.floor(totalMovie / offset) - 1;
    toggleCaraucel();
    setSlideDirection(true);
    setSlideIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  }, [toggleCaraucel, leaving, offset]);

  return (
    <>
      <S.Slider>
        <S.Increadiv>
          <S.NextButton onClick={() => decreaFunc(data)}>
            <FontAwesomeIcon icon={faChevronLeft} size={'2x'} />
          </S.NextButton>
        </S.Increadiv>
        <SliderList
          slideIndex={slideIndex}
          slideDirection={slideDirection}
          offset={offset}
          kind={kind}
          data={data}
          toggleCaraucel={toggleCaraucel}
          detailClick={openDetail}
        />
        <S.Decreadiv>
          <S.NextButton onClick={() => increaFunc(data)}>
            <FontAwesomeIcon icon={faChevronRight} size={'2x'} />
          </S.NextButton>
        </S.Decreadiv>
      </S.Slider>
      
      {(slider === kind && !!thisContent.id ) && (
        <PortalModal>
          <DetailView data={thisContent} kind={kind} closeDetail={closeDetail} />
        </PortalModal>
        )}
    </>
  )
}

export default SliderContent;


