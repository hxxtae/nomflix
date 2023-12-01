import { dto } from '../../../apis';
import { SkeletonList } from '../../../components';
import * as S from './style';
import SliderItem from '../../../components/Slider/SliderContent/SliderList/SliderItem';

interface ISearchContent {
  title: string;
  isLoading: boolean;
  datas?: dto.IContentData[];
  kind: number;
  detailClick: (content: dto.IContentData) => void;
}

function SearchContent({ title, isLoading, datas, kind, detailClick }: ISearchContent) {
  return (
    <>
      <S.Title>{ title }</S.Title>
      <S.List>
        {isLoading ?
          <SkeletonList /> :
          datas?.map((item, idx) => item.backdrop_path ?
            <SliderItem
              key={item.id + idx}
              data={item}
              kind={kind}
              detailClick={detailClick} /> :
            null)}
      </S.List>
    </>
  )
}

export default SearchContent;
