import { atom } from 'recoil';

export const headerSelect = atom({
  key: 'headerSelect',
  default: {
    movies: true,
    tv: false,
  }
})