import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { IGetMoviesResult } from '../api';
import { makeImagePath } from '../utils';
import { boxVariants, infoVariants, slideVariants } from '../animation';
import { useRecoilState } from 'recoil';
import { sliderLeave, sliderLeaveP, sliderLeaveU } from '../atoms';
import DetailView from './DetailView';
import { useState } from 'react';

const Slider = styled.div`
  position: relative;
  transform: translateY(-100px);
  height: 162px;
  margin-bottom: 100px;
`;

const Increadiv = styled.div`
  position: absolute;
  left: 0;
  z-index: 1;
`;

const Decreadiv = styled.div`
  position: absolute;
  right: 0;
`;

const NextButton = styled.button`
  height: 162px;
  background-color: rgba(0, 0, 0, .5);
  border: transparent;
  border-radius: 5px;
  color: rgba(255, 255, 255, 1);
  width: 50px;
  cursor: pointer;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  margin-bottom: 5px;
  position: absolute;
  width: 100%;
  padding: 0 60px;
`;

const Box = styled(motion.div)<{bgphoto: string}>`
  display: flex;
  flex-direction: column;
  color: red;
  font-size: 30px;
  border-radius: 6px;
  overflow: hidden;
  height: 162px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 1);
  cursor: pointer;

  &:first-child {
    transform-origin: left center;
  }
  &:last-child {
    transform-origin: right center;
  }
`;

const BoxImg = styled(motion.img)`
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
  background-color: ${props => props.theme.bgColor};
  opacity: 0;

  button {
    width: 35px;
    height: 35px;
    border: 2px solid rgba(80, 80, 80, 1);
    border-radius: 50%;
    background-color: ${props => props.theme.bgColor};
    margin-right: 5px;

    &:first-child {
      background-color: rgba(210, 210, 210, 1);
      border: 2px solid rgba(210, 210, 210, 1);
    }

    &:hover {
      border: 2px solid rgba(210, 210, 210, 1);
    }
  }

  span {
    font-size: 14px;
    color: ${props => props.theme.textColor};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;

  button {
    cursor: pointer;
  }
`;

interface INowPlaying {
  data?: IGetMoviesResult;
}


function Upcoming({data}: INowPlaying) {
  const [leavingU, setLeavingU] = useRecoilState(sliderLeaveU);
  const [indexU, setIndexU] = useState(0);
  const [decreChkU, setDecreChkU] = useState(false);

  const toggleCaraucelP = () => setLeavingU((prev) => !prev);
  const movieMatch = useRouteMatch<{ movieId: string }>('/movies/:movieId');

  const history = useHistory();
  const movieClick = (movieId: string) => {
    history.push(`/movies/${movieId}`)
  };
  
  const offset = 6;

  const incraseIndex = () => {
    if (data) {
      if (leavingU) return;
      const totalMovie = data.results.length - 1;
      const maxIndex = Math.floor(totalMovie / offset);
      setDecreChkU(false);
      toggleCaraucelP();
      setIndexU((prev) => (prev === maxIndex ? prev : prev + 1));
      if(indexU === maxIndex) setLeavingU(false);
    }
  };

  const decraseIndex = () => {
    if (data) {
      if (leavingU) return;
      setDecreChkU(true);
      toggleCaraucelP();
      setIndexU((prev) => (prev === 0 ? prev : prev - 1));
      if(indexU === 0) setLeavingU(false);
    }
  }

  return (
    <>
      <Slider>
        <Increadiv>
          <NextButton onClick={decraseIndex}> - </NextButton>
        </Increadiv>
        <AnimatePresence initial={false} onExitComplete={toggleCaraucelP} custom={decreChkU}>
          <Row
            key={indexU}
            custom={decreChkU}
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {data?.results.slice(1).slice(offset * indexU, offset * indexU + offset).map(item => (
              <Box
                key={item.id + "U"}
                layoutId={item.id+"U"}
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
        <Decreadiv>
          <NextButton onClick={incraseIndex}> + </NextButton>
        </Decreadiv>
      </Slider>
      {movieMatch && <DetailView data={data}/>}
    </>
  )
}

export default Upcoming;
