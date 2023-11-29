import { useCallback, useState, useLayoutEffect } from 'react';
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useMediaQuery, useResize } from '../../../hooks';
import { initContentData, mediaScreenSize } from '../../../constants';
import { dto } from '../../../apis';
import * as S from './style';
import DetailView from '../../DetailView';
import SliderList from './SliderList';
import PortalModal from '../../PortalModal';

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
  const smallS = useMediaQuery(`(max-width: ${mediaScreenSize.mobileS.MAX}px)`);
  const small = useMediaQuery(`(max-width: ${mediaScreenSize.mobile.MAX}px)`);
  const medium = useMediaQuery(`(max-width: ${mediaScreenSize.tablet.MAX}px)`);
  const mediumL = useMediaQuery(`(max-width: ${mediaScreenSize.tabletL.MAX}px)`);
  const sliderHeight = useResize(`.slider${kind.toString()} .sliderList`, offset);

  const openDetail = useCallback((content: dto.IContentData) => {
    if (!content?.id) return;
    setThisContent((prev) => ({
      ...prev,
      ...content
    }));
  }, []);

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
    const totalMovie = data.length;
    const maxIndex = ((kind === 18 || kind === 28) ? Math.ceil(totalMovie / offset) : Math.floor(totalMovie / offset)) - 1;
    toggleCaraucel();
    setSlideDirection(false);
    setSlideIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [toggleCaraucel, leaving, offset, kind]);

  const decreaFunc = useCallback((data: dto.IContentData[]) => {
    if (leaving || !data?.length) return;
    const totalMovie = data.length;
    const maxIndex = ((kind === 18 || kind === 28) ? Math.ceil(totalMovie / offset) : Math.floor(totalMovie / offset)) - 1;
    toggleCaraucel();
    setSlideDirection(true);
    setSlideIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [toggleCaraucel, leaving, offset, kind]);

  useLayoutEffect(() => {
    if (!mediumL && !medium && !small && !smallS) {
      setOffset(6);
      return;
    }
    if (smallS) {
      setOffset(2);
      return;
    }
    if (small) {
      setOffset(3);
      return;
    }
    if (medium) {
      setOffset(4);
      return;
    }
    if (mediumL) {
      setOffset(5);
      return;
    }
  }, [smallS, small, medium, mediumL]);

  return (
    <>
      <S.Slider setHeight={sliderHeight}>
        <S.Increadiv>
          <S.NextButton onClick={() => decreaFunc(data)}>
            <FontAwesomeIcon icon={faChevronLeft} size={'2x'} />
          </S.NextButton>
        </S.Increadiv>
        <SliderList
          data={data}
          kind={kind}
          slideIndex={slideIndex}
          slideDirection={slideDirection}
          offset={offset}
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


