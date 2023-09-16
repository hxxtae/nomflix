import { AnimatePresence } from 'framer-motion';
import { useCallback } from 'react';

import { dto } from '../../../apis';
import SliderItem from './SliderItem';
import * as S from './style';

interface ISliderList {
  slideIndex: number
  slideDirection: boolean
  offset: number
  kind: number
  data: dto.IData[]
  toggleCaraucel: () => void
  detailClick: (contentId: string) => void
}

function SliderList({ slideIndex, slideDirection, offset, kind, data, toggleCaraucel, detailClick }: ISliderList) {
  console.log('SliderList')

  const sliderDataFilter = useCallback((list: dto.IData[]) => {
    const [start, end] = [offset * slideIndex, offset * slideIndex + offset];
    return list.slice(1).slice(start, end);
  }, [offset, slideIndex]);

  return (
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
