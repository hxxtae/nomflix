import { useCallback, useState } from 'react';
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { dto } from '../../apis';
import DetailView from '../DetailView';
import SliderList from './SliderList';
import PortalModal from '../PortalModal';
import * as S from './style';

const initDetailData: dto.IData = {
  adult: false,
  genre_ids: [],
  id: 0,
  name: '',
  original_language: '',
  original_title: '',
  popularity: 0,
  release_data: '',
  backdrop_path: '',
  poster_path: '',
  title: '',
  video: false,
  bvote_average: 0,
  vote_count: 0,
  overview: '',
}

interface ISliderData {
  data: dto.IData[];
  kind: number;
  slider: number;
}

function SliderContent({ data, kind, slider }: ISliderData) {
  const [leaving, setLeaving] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(false);
  const [detailData, setDetailData] = useState<dto.IData>(initDetailData);
  const offset = 6;

  const openDetail = useCallback((contentId: string) => {
    const detailData = data?.find((item) => item.id.toString() === contentId);
    if (!detailData) return;
    setDetailData((prev) => ({
      ...prev,
      ...detailData
    }))
  }, [data]);

  const closeDetail = useCallback(() => {
    setDetailData((prev) => ({
      ...prev,
      ...initDetailData
    }));
  }, []);

  const toggleCaraucel = useCallback(() =>
    setLeaving((prev) => !prev), []);

  const increaFunc = useCallback((data: dto.IData[]) => {
    if (leaving || !data?.length) return;
    const totalMovie = data.length - 1;
    const maxIndex = Math.floor(totalMovie / offset) - 1;
    toggleCaraucel();
    setSlideDirection(false);
    setSlideIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  }, [toggleCaraucel, leaving]);

  const decreaFunc = useCallback((data: dto.IData[]) => {
    if (leaving || !data?.length) return;
    const totalMovie = data.length - 1;
    const maxIndex = Math.floor(totalMovie / offset) - 1;
    toggleCaraucel();
    setSlideDirection(true);
    setSlideIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  }, [toggleCaraucel, leaving]);

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
      
      {(slider === kind && !!detailData.id ) && (
        <PortalModal>
          <DetailView data={detailData} kind={kind} closeDetail={closeDetail} />
        </PortalModal>
        )}
    </>
  )
}

export default SliderContent;


