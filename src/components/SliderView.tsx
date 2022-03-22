import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { IGetMoviesResult, IMovie } from '../api';
import { makeImagePath } from '../utils';
import { boxVariants, infoVariants, slideVariants } from '../animation';
import DetailView from './DetailView';
import { useState, useRef } from 'react';
import { faPlay, faThumbsDown, faThumbsUp, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
interface INowPlaying {
  data?: IMovie[];
  kind: number;
}

function SliderView({data, kind}: INowPlaying) {
  const [leaving, setLeaving] = useState(false);
  const [index, setIndex] = useState(0);
  const [decreChk, setDecreChk] = useState(false);
  const [sliderkind, setSliderKind] = useState('');

  const toggleCaraucel = () => setLeaving((prev) => !prev);
  const movieMatch = useRouteMatch<{ movieId: string }>('/movies/:movieId');

  const thisele = useRef<HTMLDivElement>(null);
  const history = useHistory();
  const movieClick = (movieId: string) => {
    history.push(`/movies/${movieId}?slider=${kind}`);
    setSliderKind(thisele.current?.dataset.name || '');
  };
  
  const offset = 6;

  const incraseIndex = () => {
    if (data) {
      if (leaving) return;
      const totalMovie = data.length - 1;
      const maxIndex = Math.floor(totalMovie / offset) - 1;
      setDecreChk(false);
      toggleCaraucel();
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const decraseIndex = () => {
    if (data) {
      if (leaving) return;
      const totalMovie = data.length - 1;
      const maxIndex = Math.floor(totalMovie / offset) - 1;
      setDecreChk(true);
      toggleCaraucel();
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  }

  return (
    <>
      <Slider>
        <Increadiv>
          <NextButton onClick={decraseIndex}>
            <i className="fas fa-chevron-left" data-projection-id="5279"></i>
          </NextButton>
        </Increadiv>
        <AnimatePresence initial={false} onExitComplete={toggleCaraucel} custom={decreChk}>
          <Row
            key={index}
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
                onClick={() => movieClick(item.id + "")}
                bgphoto={makeImagePath(item.backdrop_path, 'w500')}
                variants={boxVariants}
                whileHover="hover"
                transition={{ type: "tween" }}
                ref={thisele}
              >
                <BoxImg
                  variants={infoVariants}
                  src={makeImagePath(item.backdrop_path, 'w500')} />
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
                  <span>{item.title}</span>
                </Info>
              </Box>
            ))}
          </Row>
        </AnimatePresence>
        <Decreadiv>
          <NextButton onClick={incraseIndex}>
            <i className="fas fa-chevron-right" data-projection-id="5279"></i>
          </NextButton>
        </Decreadiv>
      </Slider>
      {movieMatch && (
        <DetailView key="xmvcd" data={data} kind={kind} sliderkind={sliderkind}/>
      )}
    </>
  )
}

export default SliderView;
