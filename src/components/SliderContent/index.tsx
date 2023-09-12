import { useCallback,useState } from 'react';
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { dto } from '../../apis';
import DetailView from '../DetailView';
import SliderList from './SliderList';
import * as S from './style';
import PortalModal from '../PortalModal';

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
    const totalMovie = data.length - 1;
    const maxIndex = Math.floor(totalMovie / offset) - 1;
    setSlideDirection(false);
    toggleCaraucel();
    setSlideIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  }, [toggleCaraucel]);

  const decreaFunc = useCallback((data: dto.IData[]) => {
    const totalMovie = data.length - 1;
    const maxIndex = Math.floor(totalMovie / offset) - 1;
    setSlideDirection(true);
    toggleCaraucel();
    setSlideIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  }, [toggleCaraucel]);

  const incraseSlider = () => {
    if (!leaving && data?.length) increaFunc(data);
  };

  const decraseSlider = () => {
    if (!leaving && data?.length) decreaFunc(data);
  };

  return (
    <>
      <S.Slider>
        <S.Increadiv>
          <S.NextButton onClick={decraseSlider}>
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
          <S.NextButton onClick={incraseSlider}>
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


