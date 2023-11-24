import { AnimatePresence } from 'framer-motion';
import { useCallback } from 'react';

import { dto } from '../../../../apis';
import * as S from './style';
import SliderItem from './SliderItem';
import SliderRankItem from './SliderRankItem';

interface ISliderList {
  data: dto.IContentData[]
  kind: number
  slideIndex: number
  slideDirection: boolean
  offset: number
  toggleCaraucel: () => void
  detailClick: (content: dto.IContentData) => void
}

function SliderList({ data, kind, slideIndex, slideDirection, offset, toggleCaraucel, detailClick }: ISliderList) {
  const sliderDataFilter = useCallback((list: dto.IContentData[]) => {
    const [start, end] = [offset * slideIndex, offset * slideIndex + offset];
    return list.slice(start, end);
  }, [offset, slideIndex]);

  return (
    // NOTE: ✨ <AnimatePresence> 효과를 적용하려면 자식 컴포넌트인 motion 컴포넌트 바로 위에 위치해야 한다.
    <AnimatePresence initial={false} onExitComplete={toggleCaraucel} custom={slideDirection}>
      <S.Row
        className='sliderList'
        key={kind.toString() + slideIndex}
        offset={offset}
        custom={slideDirection}
        variants={S.slideVariants}
        initial="hidden"
        animate="visible"
        exit="exit" >
        {!(kind === 18 || kind === 28) && sliderDataFilter(data).map(item => (
          <SliderItem
            key={item.id + kind.toString()}
            data={item}
            kind={kind}
            detailClick={detailClick} />
        ))}
        {(kind === 18 || kind === 28) && sliderDataFilter(data).map((item, idx) => (
          <SliderRankItem
            key={item.id + kind.toString()}
            data={item}
            kind={kind}
            rank={idx + (slideIndex * offset)}
            detailClick={detailClick} />
        ))}
      </S.Row>
    </AnimatePresence>
  )
}

export default SliderList;
