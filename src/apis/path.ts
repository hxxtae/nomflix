type IMainKinds = 'movie' | 'tv';
type ISubKinds = 'now_playing' | 'popular' | 'top_rated' | 'latest' | 'upcoming' | 'on_the_air' | 'airing_today' | 'similar' | 'credits';
type IRequestKind = 'api_key' | 'token';
type ILanguage = 'en-US' | 'kr';

const BASE_URL = process.env.REACT_APP_BASE_PATH;
const API_KEY = process.env.REACT_APP_API_KEY;
const LANGUAGE: ILanguage = 'en-US';

interface IOptions {
  request_id?: string;
  request_kind?: IRequestKind;
}

// -------------------------------------
// USE TO Movie & Tv Content Path
// --------------------------------------
export const apiContentPath = (page: number, mainKind: IMainKinds, subKind: ISubKinds, options: IOptions = {}) => {
  const { request_id: content_Id = '' } = options;
  return `${BASE_URL}/${mainKind}/${content_Id}/${subKind}?api_key=${API_KEY}&page=${page}`;
}

// -------------------------------------
// USE TO Movie & Tv Content-Detail Path
// --------------------------------------
// - kind: 11 ~ 20 -> movie content
// - kind: 21 ~ 30 -> tv content
export const apiDetailPath = (detailId: string, kind: number) => {
  const validate =
    kind <= 20 ? `movie/${detailId}` :
    kind <= 30 ? `tv/${detailId}` : '';
  return `${BASE_URL}/${validate}?api_key=${API_KEY}&language=${LANGUAGE}&append_to_response=videos`;
}

// -------------------------------------
// USE TO Movie & Tv Content Search Path
// -------------------------------------
export const apiSearchPath = (page: number, mainKind: IMainKinds, query: string, include_adult: boolean = false) => {
  return `${BASE_URL}/search/${mainKind}?api_key=${API_KEY}&query=${query}&language=${LANGUAGE}&page=${page}&include_adult=${include_adult}`;
}