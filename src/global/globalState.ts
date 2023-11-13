import { atom } from 'recoil';
import { dto } from '../apis';
import { initContentData } from '../constants';

export const atomOfContentData = atom<dto.IContentData>({
  key: 'bannerState',
  default: { ...initContentData }
});
