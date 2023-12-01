import styled from 'styled-components';

import { HEADER_HEIGHT } from '../../global';

export const infoHoverVariants = (match: boolean) => ({
  // Child Hover
  hover: {
    opacity: match ? 0 : 1,
    transition: {
      delay: 0.5,
      duration: 0.3
    }
  },
})

export const Wrapper = styled.div`
  position: relative;
  padding-top: ${HEADER_HEIGHT}px;
  margin: 0px 4% 100px;
  min-height: 100vh;
`;
