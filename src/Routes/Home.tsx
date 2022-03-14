import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getMovies, IGetMoviesResult } from '../api';
import { makeImagePath } from '../utils';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { sliderLeave } from '../atoms';
import NowPlaying from '../components/NowPlaying';

const Wrapper = styled.div`

`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{bgphoto: string}>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${(props) => props.bgphoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;


function Home() {
  console.log('Home');

  const { isLoading, data } = useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useRecoilState(sliderLeave);
  const toggleCaraucel = () => setLeaving((prev) => !prev);
  const offset = 6;
  
  const incraseIndex = () => {
    if (data) {
      if (leaving) return;
      const totalMovie = data.results.length - 1;
      const maxIndex = Math.floor(totalMovie / offset);
      toggleCaraucel();
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  return (
    <Wrapper>{isLoading ? (
      <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            onClick={incraseIndex}
            bgphoto={makeImagePath(data?.results[0].backdrop_path || "")}
          >
            <Title>{ data?.results[0].title }</Title>
            <Overview>{ data?.results[0].overview }</Overview>
          </Banner>
          <NowPlaying data={data} index={index} offset={offset} />
        </>
      )}
    </Wrapper>
  );
}

export default Home;


// [ AnimatePresence ]
// 컴포넌트가 render되거나 destroy 될 때 효과를 줄 수 있다.

// ( props )
// 1. initial: boolean
// 2. custom: any
// 3. exitBeforeEnter: boolean
// 4. onExitComplete: void

// [ Gestures ]
// variants로 인해 whileHover 같은 props는 자동적으로 자식 element에게 상속된다.
// (단 해당 variants의 속성의 initial 이름이나 animate(GesturesEvent)의 이름은 부모의 variants안의 속성 이름과 같아야 한다.)
