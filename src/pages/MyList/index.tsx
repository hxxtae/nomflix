import { useCallback, useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useRecoilValue } from 'recoil';

import { dto } from '../../apis';
import { atomOfMylistData } from '../../global';
import { initContentData } from '../../constants';
import { DetailView, PortalModal } from '../../components';
import * as S from './style';
import SliderItem from '../../components/Slider/SliderContent/SliderList/SliderItem';

function MyList() {
  const [chooseContent, setChooseContent] = useState<dto.IContentData>(initContentData);
  const mylistDatas = useRecoilValue(atomOfMylistData);
  const [contentKind, setContentKind] = useState(0);
  
  const getMylistArr = useCallback((): dto.IContentData[] | undefined => {
    if (!mylistDatas.size) return;
    return Array.from(mylistDatas.values());
  }, [mylistDatas]);

  const openDetail = useCallback((content: dto.IContentData) => {
    if (!content?.id || !content?.kind) return;
    setContentKind(content.kind);
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
          <S.Title>MY LIST</S.Title>
          <S.List>
            {getMylistArr()?.map(content => (
              content?.kind ? 
                <SliderItem key={content.id} data={content} kind={content.kind} detailClick={openDetail} /> :
                null
            ))}
          </S.List>
        </S.Wrapper>

        {!!chooseContent.id && (
          <PortalModal>
            <DetailView data={chooseContent} kind={contentKind} closeDetail={closeDetail} />
          </PortalModal>
        )}
      </>
    </AnimatePresence>
  )
}

export default MyList;
