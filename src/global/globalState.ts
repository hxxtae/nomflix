import { atom } from 'recoil';
import { dto } from '../apis';

export const DetailViewState = atom({
  key: 'DetailViewState',
  default: {
    state: false,
    id: ''
  }
});

export const atomOfContentData = atom<dto.IContentData>({
  key: 'bannerState',
  default: {
    adult: false,
    backdrop_path: '',
    genre_ids: [],
    id: 0,
    overview: '',
    name: '',
    original_language: '',
    original_name: '',
    original_title: '',
    popularity: 0,
    poster_path: '',
    release_date: '',
    title: '',
    video: false,
    vote_average: 0,
    vote_count: 0
  }
})