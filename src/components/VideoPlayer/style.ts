import styled from 'styled-components';

import { media } from '../../utils';
import { DETAILVIEW_IMAGE_SIZE_MB, DETAILVIEW_IMAGE_SIZE_PC } from '../../global';

export const Wrapper = styled.section`
  position: absolute;
  inset: 0;
  aspect-ratio: 16 / 9;
  width: 100%;
  min-height: ${DETAILVIEW_IMAGE_SIZE_PC}px;
  z-index: 1;

  ${media('mobile')} {
    min-height: ${DETAILVIEW_IMAGE_SIZE_MB}px;
  }
`;
