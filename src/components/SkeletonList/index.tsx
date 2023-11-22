import * as S from './style';

interface ISkeletonList {
  height?: number;
}

function SkeletonList({ height = 110 }: ISkeletonList) {
  return (
    <S.Wrapper height={height}>
      <S.List>
        {Array(20).fill(null).map((_, idx) =>
          <S.Item key={idx} variants={S.listVariants(idx)} initial="init" animate="show" ></S.Item>)}
      </S.List>
    </S.Wrapper>
  )
}

export default SkeletonList;
