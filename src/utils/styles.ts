import { mediaScreenSize } from '../constants';

type IKind = 'pc' | 'tablet' | 'mobile';

export const media = (kind: IKind = 'pc') => `
  @media only screen and (max-width: ${mediaScreenSize[kind].MAX}px)
`;