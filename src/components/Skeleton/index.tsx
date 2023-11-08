import * as S from './style';

interface ISkeleton {
  classes: string;
}

function Skeleton({ classes }: ISkeleton) {
  const classNames = `${classes} animate-pulse`;

  return (
    <S.Box className={classNames}></S.Box>
  )
}

export default Skeleton;
