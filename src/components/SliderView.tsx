import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { faPlay, faThumbsDown, faThumbsUp, faPlus, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IData } from '../api/api';
import { makeImagePath } from '../utils';
import { boxVariants, infoVariants, slideVariants } from '../constants/animation';
import DetailView from './DetailView';

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
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(255, 255, 255, .8);
    cursor: pointer;

    &:first-child {
      color: rgba(0, 0, 0, .8);
    }
  }
`;
interface ISliderData {
  data?: IData[];
  kind: number;
}

function SliderView({ data, kind }: ISliderData) {
  console.log('SliderView');

  const [leaving, setLeaving] = useState(false);
  const [index, setIndex] = useState(0);
  const [decreChk, setDecreChk] = useState(false);
  const offset = 6;
  
  const toggleCaraucel = () => setLeaving((prev) => !prev);
  const movieMatch = useRouteMatch<{ movieId: string }>('/movies/:movieId');
  const tvMatch = useRouteMatch<{ tvId: string }>('/tv/:tvId');
  const history = useHistory();

  const detailClick = (movieId: string) => {
    const { pathname } = history.location;
    const path = pathname === '/' ? '/movies' : pathname; 
    history.push(`${path}/${movieId}?slider=${kind}`);
  };

  const increaFunc = (data: IData[]) => {
    const totalMovie = data.length - 1;
    const maxIndex = Math.floor(totalMovie / offset) - 1;
    setDecreChk(false);
    toggleCaraucel();
    setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  }

  const decreaFunc = (data: IData[]) => {
    const totalMovie = data.length - 1;
    const maxIndex = Math.floor(totalMovie / offset) - 1;
    setDecreChk(true);
    toggleCaraucel();
    setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  }

  const incraseSlider = () => {
    if (leaving) return;
    if (data) {
      increaFunc(data);
    }
  };

  const decraseSlider = () => {
    if (leaving) return;
    if (data) {
      decreaFunc(data);
    }
  };

  return (
    <>
      <Slider>
        <Increadiv>
          <NextButton onClick={decraseSlider}>
            <FontAwesomeIcon icon={faChevronLeft} size={'2x'} />
          </NextButton>
        </Increadiv>
        <AnimatePresence initial={false} onExitComplete={toggleCaraucel} custom={decreChk}>
          <Row
            key={index + kind.toString()}
            custom={decreChk}
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {data?.slice(1).slice(offset * index, offset * index + offset).map(item => (
              <Box
                key={item.id + kind.toString()}
                layoutId={item.id + kind.toString()}
                onClick={() => detailClick(item.id + "")}
                bgphoto={makeImagePath(item.backdrop_path, 'w500')}
                variants={boxVariants}
                whileHover="hover"
                transition={{ type: "tween" }}
              >
                <BoxImg variants={infoVariants} src={makeImagePath(item.backdrop_path, 'w500')} />
                <Info variants={infoVariants} >
                  <ButtonGroup>
                    <button>
                      <FontAwesomeIcon icon={faPlay} size="1x" />
                    </button>
                    <button>
                      <FontAwesomeIcon icon={faThumbsUp} size="1x" />
                    </button>
                    <button>
                      <FontAwesomeIcon icon={faThumbsDown} size="1x" />
                    </button>
                    <button>
                      <FontAwesomeIcon icon={faPlus} size="1x" />
                    </button>
                  </ButtonGroup>
                  <span>{item.title || item.name}</span>
                </Info>
              </Box>
            ))}
          </Row>
        </AnimatePresence>
        <Decreadiv>
          <NextButton onClick={incraseSlider}>
            <FontAwesomeIcon icon={faChevronRight} size={'2x'} />
          </NextButton>
        </Decreadiv>
      </Slider>
      
      {(movieMatch || tvMatch) && (
        <DetailView data={data} kind={kind}/>
      )}
    </>
  )
}

export default SliderView;
