import ReactPlayer from 'react-player';

import * as S from './style';

interface IVideoPlayer {
  videoKey?: string;
}

const DEFAULT_VIDEO = 'GV3HUDMQ-F8';

function VideoPlayer({ videoKey = DEFAULT_VIDEO }: IVideoPlayer) {

  return (
    <S.Wrapper>
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${videoKey}`}
        playing={true}
        width="100%"
        height="100%"
        className="contentVideo"
        volume={1}
        controls={true}
      />
    </S.Wrapper>
  )
}

export default VideoPlayer;
