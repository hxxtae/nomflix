import { atom } from 'recoil';

export const DetailViewState = atom({
  key: 'DetailViewState',
  default: {
    state: false,
    id: ''
  }
})