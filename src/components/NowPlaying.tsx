import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { IGetMoviesResult } from '../api';
import { makeImagePath } from '../utils';
import { boxVariants, infoVariants, slideVariants } from '../animation';
import { useSetRecoilState } from 'recoil';
import { sliderLeave } from '../atoms';
import DetailView from './DetailView';

const Slider = styled.div`
  position: relative;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  margin-bottom: 5px;
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{bgphoto: string}>`
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  flex-direction: column;
  color: red;
  font-size: 30px;  
  &:first-child {
    transform-origin: left center;
  }
  &:last-child {
    transform-origin: right center;
  }
`;

const BoxImg = styled(motion.img)`
  opacity: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Info = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 15px;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0;

  button {
    width: 30px;
    height: 30px;
    border: 1px solid white;
    border-radius: 50%;
    background-color: black;

    &:hover {
      opacity: 0.4;
    }
  }

  span {
    font-size: 14px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
`;

interface INowPlaying {
  data?: IGetMoviesResult;
  index: number;
  offset: number;
}


function NowPlaying({data, index, offset}: INowPlaying) {
  const history = useHistory();
  const setLeaving = useSetRecoilState(sliderLeave);
  const toggleCaraucel = () => setLeaving((prev) => !prev);
  const movieMatch = useRouteMatch<{ movieId: string }>('/movies/:movieId');

  const movieClick = (movieId: string) => {
    history.push(`/movies/${movieId}`)
  };

  return (
    <>
      <Slider>
        <AnimatePresence initial={false} onExitComplete={toggleCaraucel}>
          <Row
            key={index}
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {data?.results.slice(1).slice(offset * index, offset * index + offset).map(item => (
              <Box
                key={item.id}
                layoutId={item.id + ""}
                onClick={() => movieClick(item.id + "")}
                bgphoto={makeImagePath(item.backdrop_path, 'w500')}
                variants={boxVariants}
                whileHover="hover"
                transition={{type: "tween"}}
              >
                <BoxImg
                  variants={infoVariants}
                  src={makeImagePath(item.backdrop_path, 'w500')} />
                <Info variants={infoVariants} >
                  <ButtonGroup>
                    <button>1</button>
                    <button>2</button>
                    <button>+</button>
                    <button>-</button>
                  </ButtonGroup>
                  <span>{item.title}</span>
                </Info>
              </Box>
            ))}
          </Row>
        </AnimatePresence>
      </Slider>
      {movieMatch && <DetailView data={data}/>}
    </>
  )
}

export default NowPlaying;
