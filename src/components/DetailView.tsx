import { faPlay, faThumbsDown, faThumbsUp, faPlus } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence, useViewportScroll, MotionValue } from 'framer-motion';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from 'react-query';
import queryString from 'query-string';
import styled from 'styled-components';

import { makeImagePath, publicUrlStr } from '../utils';
import { api, dto } from '../apis';


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

const BigContent = styled(motion.div)<{scrolly: MotionValue<number>}>`
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
  background-repeat: no-repeat;
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

interface IDetailView {
  data?: dto.IData[];
  kind: number;
};

function DetailView({ data, kind }: IDetailView) {
  console.log("DetailView");

  const history = useHistory();
  const detailMatch = useRouteMatch<{ movieId: string, tvId: string }>([`${publicUrlStr()}/movies/:movieId`, `${publicUrlStr()}/tv/:tvId`]);
  const location = useLocation();
  const parsed = queryString.parse(location.search);
  const locationChk = parsed ? parsed.slider : null;
  const { scrollY } = useViewportScroll();

  const { isLoading, data: detailData } = useQuery<dto.IGetDetail>(["movieAndtv", "detail"], () => api.getDetail(detailMatch?.params.movieId, detailMatch?.params.tvId));
  
  const closeBigMovie = () => {
    if (detailMatch?.params.movieId) {
      history.push(`${publicUrlStr()}/`);
    } else if (detailMatch?.params.tvId) {
      history.push(`${publicUrlStr()}/tv`);
    }
  };

  const clickDetail = (detailMatch?.params.movieId || detailMatch?.params.tvId) && data?.find((movie) =>
    movie.id === (+detailMatch.params.movieId || +detailMatch.params.tvId)
  );
  // data에 movie id와 route의 movieId가 같으면 true가 되면서 DetailView 컴포넌트가 render 된다.
  // -> SliderView는 어러 컴포넌트로(재사용) 선언 되었지만,
  //    DetailView는 하나의 컴포넌트만 선언 되어 호출되므로
  //    SliderView 컴포넌트들이 하나의 DetailView 컴포넌트를 사용하게 된다.
  //    그래서 아래 locationChk가 추가로 필요한 이유이다.
  //  ※ (A)같은 컴포넌트를 여러개 선언하여 render 하는 경우와
  //     (B)여러 컴포넌트에서 하나의 컴포넌트를 render 하는 경우의 차이
  //     (컴포넌트의 스코프에 존재하는 값들의 공유 유무의 차이)
  //     (A : 같은 컴포넌트를 여러개 선언 : 같은 컴포넌트지만 선언된 컴포넌트는 독립적이다.)
  //     (B : 하나의 컴포넌트를 참조하여 사용되므로 참조된다.)
  
  return (
    <AnimatePresence>
      {locationChk === kind.toString() && clickDetail &&
        <>
          <Overlay
            onClick={closeBigMovie}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
          </Overlay>
          <BigContent
            layoutId={(detailMatch?.params.movieId || detailMatch?.params.tvId) + kind.toString()}
            scrolly={scrollY}
          >
            <BigCover bgPhoto={makeImagePath(clickDetail.backdrop_path)} />
            <BigWrapper>
              <BigTitle>{clickDetail.title || clickDetail.name}</BigTitle>
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
              <BigOverview>{clickDetail.overview}</BigOverview>
              {isLoading ||
                <>
                  <BigDetail>
                    {detailData?.production_companies.map((item, index) => (
                      <div key={index.toString()}>
                        <img src={makeImagePath(item.logo_path, 'w500')} alt={item.name} />
                      </div>
                    ))}
                  </BigDetail>
                  <BigDetail>
                    {detailData?.production_companies.map((item, index) => (
                      <span key={index.toString()}>{item.name}</span>
                    ))}
                  </BigDetail>
                </>
              }
            </BigWrapper>
          </BigContent>
        </>
      }
    </AnimatePresence > 
  )
}

export default DetailView;
