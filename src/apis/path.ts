const baseURL = process.env.REACT_APP_BASE_PATH;
const apiKEY = process.env.REACT_APP_API_KEY;

type ISubKinds = 'similar' | 'credits';
type IMovieKinds = 'now_playing' | 'popular' | 'top_rated' | 'latest' | 'upcoming' | ISubKinds;
type ITvKinds = 'on_the_air' | 'popular' | 'top_rated' | 'airing_today' | ISubKinds;
type IRequestKind = 'api_key' | 'token';
interface IOptions {
  request_id?: string;
  request_kind?: IRequestKind;
}

// -------------------------------------
// USE TO Movie Content Path
// --------------------------------------
export const apiMoviePath = (page: number, subKinds: IMovieKinds, options: IOptions = {}) => {
  const { request_id: movieId = '' } = options;
  return `${baseURL}/movie/${movieId}/${subKinds}?api_key=${apiKEY}&page=${page}`;
}

// -------------------------------------
// USE TO Tv Content Path
// --------------------------------------
export const apiTvPath = (page: number, subKinds: ITvKinds, options: IOptions = {}) => {
  const { request_id: tvId = '' } = options;
  return `${baseURL}/tv/${tvId}/${subKinds}?api_key=${apiKEY}&page=${page}`;
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
  return `${baseURL}/${validate}?api_key=${apiKEY}&language=en-US&append_to_response=videos`;
}
