import { atom } from 'recoil';
import { dto } from '../apis';
import { initContentData } from '../constants';
import { getContentsStorage } from '../utils';

export const atomOfContentData = atom<dto.IContentData>({
  key: 'bannerState',
  default: { ...initContentData }
});

export const atomOfMylistData = atom<Map<number, dto.IContentData>>({
  key: 'mylistState',
  default: getContentsStorage('mylist')
});

export const atomOfProfileData = atom<dto.IProfilesData>({
  key: 'profileState',
  default: {
    id: 0,
    name: '',
    background_path: ''
  }
})
