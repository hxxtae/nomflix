import styled from 'styled-components';

export const Wrapper = styled.section<{ inset: boolean }>`
  position: absolute;
  ${({ inset }) => inset ? 'inset: 0' : ''};
  width: 100%;
  /* min-height: 300px; */
  aspect-ratio: 16 / 9;
  z-index: 1;
`;
