import { Skeleton } from '../../components';
import * as S from './style';

function SkeletonPost() {
  return (
    <S.Boxes>
      <Skeleton classes='text' />
      <Skeleton classes='text width-100' />
      <Skeleton classes='text width-100' />
      <Skeleton classes='text width-100' />
      <Skeleton classes='text width-75' />
    </S.Boxes>
  )
}

export default SkeletonPost;
