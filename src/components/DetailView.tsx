import styled from 'styled-components';
import { motion, AnimatePresence, useViewportScroll, MotionValue } from 'framer-motion';
import { makeImagePath } from '../utils';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { getDetail, IGetDataResult, IGetMovieDetail, IData } from '../api';
import { useQuery } from 'react-query';
import { faPlay, faThumbsDown, faThumbsUp, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Overlay = styled(motion.div)`
  opacity: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 1000px;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
`;

const BigMovie = styled(motion.div)<{scrolly: MotionValue<number>}>`
  position: absolute;
  width: 42vw;
  height: 90vh;
  top: ${(props) => props.scrolly.get() + 100}px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${props => props.theme.bgColor};
  border-radius: 10px;
  overflow: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
  z-index: 2;
`;

const BigCover = styled.div<{bgPhoto: string}>`
  width: 100%;
  height: 450px;
  background-image: linear-gradient(rgba(20, 20, 20, 0), rgba(20, 20, 20, 1)), url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
`;

const BigWrapper = styled.div`
  position: relative;
  top: -80px;
  padding: 0 40px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.textColor};
  padding: 20px;
  font-size: 46px;
`;

const BigButtonGroup = styled.div`
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;

  button {
    width: 40px;
    height: 40px;
    border: 2px solid rgba(80, 80, 80, 1);
    border-radius: 50%;
    background-color: ${props => props.theme.bgColor};
    margin-right: 10px;
    color: rgba(255, 255, 255, .8);
    cursor: pointer;

    &:active {
      opacity: .8;
    }

    &:first-child {
      width: 150px;
      background-color: rgba(255, 255, 255, 1);
      border-radius: 10px;
      margin-right: 20px;
      font-size: 20px;
      font-weight: bold;
      border: none;
      color: rgba(0, 0, 0, .8);

      span {
        margin-right: 22px;
      }
    }
  }
`;

const BigOverview = styled.p`
  padding: 20px;
  color: ${(props) => props.theme.textColor};
  letter-spacing: 1px;
  line-height: 30px;
  margin-bottom: 100px;
`;

const BigDetail = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;

  div {
    width: 120px;
    margin-bottom: 20px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  span {
    margin-bottom: 20px;
  }
`;

const BigCompany = styled.span`

`;

interface IDetailView {
  data?: IData[];
  kind: number;
}

function DetailView({data, kind}: IDetailView) {
  const history = useHistory();
  const movieMatch = useRouteMatch<{ movieId: string }>('/movies/:movieId');

  const { isLoading, data: detailData } = useQuery<IGetMovieDetail>(["movie", "detail"], () => getDetail(movieMatch?.params.movieId));
  
  const closeBigMovie = () => history.push('/');
  const { scrollY } = useViewportScroll();

  const location = useLocation();
  const queryString = require('query-string');
  const parsed = queryString.parse(location.search);

  const clickMovie = movieMatch?.params.movieId &&
    data?.find((movie) =>
      movie.id === +movieMatch.params.movieId
    );
  // data에 movie id와 route의 movieId가 같으면 true
  // -> SliderView는 어러 컴포넌트로(재사용) 선언 되었지만,
  //    DetailView는 하나의 컴포넌트만 선언 되어 호출되므로
  //    SliderView 컴포넌트들이 하나의 DetailView 컴포넌트를 사용하게 된다.
  //    그래서 아래 locationChk가 필요한 이유이다.
  
  const locationChk = parsed ? parsed.slider : null;

  return (
    <AnimatePresence>
      { locationChk == kind && clickMovie && (
        <>
          <Overlay
            onClick={closeBigMovie}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
          </Overlay>
          <BigMovie
            layoutId={movieMatch?.params.movieId + kind.toString()}
            scrolly={scrollY}
          >
            {(
              <>
                <BigCover bgPhoto={makeImagePath(clickMovie.backdrop_path)} />
                <BigWrapper>
                  <BigTitle>{clickMovie.title}</BigTitle>
                  <BigButtonGroup>
                    <button>
                      <span>재생</span>
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
                  </BigButtonGroup>
                  <BigOverview>{clickMovie.overview}</BigOverview>
                  <BigDetail>
                    {isLoading || detailData?.production_companies.map(item => (
                      <div>
                        <img src={makeImagePath(item.logo_path, 'w500')} alt={item.name} />
                      </div>
                    ))}
                  </BigDetail>
                  <BigDetail>
                    {isLoading || detailData?.production_companies.map(item => (
                      <span>{item.name}</span>
                    ))}
                  </BigDetail>
                </BigWrapper>
              </>
            )}
          </BigMovie>
        </>)}
    </AnimatePresence>
  )
}

export default DetailView;
