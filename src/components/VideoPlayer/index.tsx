import ReactPlayer from 'react-player';

import * as S from './style';

interface IVideoPlayer {
  videoKey?: string;
  inset?: boolean;
}

const DEFAULT_VIDEO = 'GV3HUDMQ-F8';

function VideoPlayer({ videoKey = DEFAULT_VIDEO, inset = true }: IVideoPlayer) {

  return (
    <S.Wrapper inset={inset}>
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
