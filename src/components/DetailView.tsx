import styled from 'styled-components';
import { motion, AnimatePresence, useViewportScroll, MotionValue } from 'framer-motion';
import { makeImagePath } from '../utils';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { IGetMoviesResult } from '../api';

const Overlay = styled(motion.div)`
  opacity: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const BigMovie = styled(motion.div)<{scrolly: MotionValue<number>}>`
  position: absolute;
  width: 40vw;
  height: 80vh;
  top: ${(props) => props.scrolly.get() + 100}px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${props => props.theme.bgColor};
  border-radius: 10px;
  overflow: hidden;
`;

const BigCover = styled.div`
  width: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.textColor};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.textColor};
`;

interface IDetailView {
  data?: IGetMoviesResult;
}

function DetailView({data}: IDetailView) {
  const history = useHistory();
  const movieMatch = useRouteMatch<{ movieId: string }>('/movies/:movieId');
  
  const closeBigMovie = () => history.push('/');
  const { scrollY } = useViewportScroll();

  const clickMovie = movieMatch?.params.movieId &&
    data?.results.find((movie) =>
      movie.id === +movieMatch.params.movieId
    );

  return (
    <AnimatePresence>
      {(
        <>
          <Overlay
            onClick={closeBigMovie}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
          </Overlay>
          <BigMovie
            layoutId={movieMatch?.params.movieId}
            scrolly={scrollY}
          >
            {
              clickMovie && 
              (
                <>
                  <BigCover>
                    <img src={makeImagePath(clickMovie.backdrop_path, "w500")} />
                  </BigCover>
                  <BigTitle>{ clickMovie.title }</BigTitle>
                  <BigOverview>{ clickMovie.overview }</BigOverview>
                </>
              )
            }
          </BigMovie>
        </>)}
    </AnimatePresence>
  )
}

export default DetailView;
