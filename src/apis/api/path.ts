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
// USE TO "API KEY" & "API ACCESS TOKEN"
// --------------------------------------
export const apiMoviePath = (page: number, subKinds: IMovieKinds, options?: IOptions) => {
  const movieId = options?.request_id ?? '';
  return `${baseURL}/movie/${movieId}/${subKinds}?api_key=${apiKEY}&page=${page}`;
}

export const apiTvPath = (page: number, subKinds: ITvKinds, options?: IOptions) => {
  const tvId = options?.request_id ?? '';
  return `${baseURL}/tv/${tvId}/${subKinds}?api_key=${apiKEY}&page=${page}`;
}

export const apiDetailPath = (detailId: string, kind: number) => {
  const validate =
    kind < 20 ? `movie/${detailId}` :
    kind < 30 ? `tv/${detailId}` : '';
  return `${baseURL}/${validate}?api_key=${apiKEY}`;
}
