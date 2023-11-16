import { AnimatePresence } from 'framer-motion';
import { useCallback } from 'react';

import { dto } from '../../../../apis';
import * as S from './style';
import SliderItem from './SliderItem';

interface ISliderList {
  slideIndex: number
  slideDirection: boolean
  offset: number
  kind: number
  data: dto.IContentData[]
  toggleCaraucel: () => void
  detailClick: (content: dto.IContentData) => void
}

function SliderList({ slideIndex, slideDirection, offset, kind, data, toggleCaraucel, detailClick }: ISliderList) {
  const sliderDataFilter = useCallback((list: dto.IContentData[]) => {
    const [start, end] = [offset * slideIndex, offset * slideIndex + offset];
    return list.slice(1).slice(start, end);
  }, [offset, slideIndex]);

  return (
    // NOTE: ✨ <AnimatePresence> 효과를 적용하려면 자식 컴포넌트인 motion 컴포넌트 바로 위에 위치해야 한다.
    <AnimatePresence initial={false} onExitComplete={toggleCaraucel} custom={slideDirection}>
      <S.Row
        key={kind.toString() + slideIndex}
        offset={offset}
        custom={slideDirection}
        variants={S.slideVariants}
        initial="hidden"
        animate="visible"
        exit="exit" >
        {sliderDataFilter(data).map(item => (
          <SliderItem
            key={item.id + kind.toString()}
            data={item}
            kind={kind}
            detailClick={detailClick} />
        ))}
      </S.Row>
    </AnimatePresence>
  )
}

export default SliderList;
