const baseURL = process.env.REACT_APP_BASE_PATH;
const apiKEY = process.env.REACT_APP_API_KEY;

type IMovieKinds = 'now_playing' | 'popular' | 'top_rated' | 'latest' | 'upcoming';
type ITvKinds = 'on_the_air';

export const apiMoviePath = (page: number, subKinds: IMovieKinds) => {
  return `${baseURL}/movie/${subKinds}?api_key=${apiKEY}&page=${page}`;
}

export const apiTvPath = (page: number, subKinds: ITvKinds) => {
  return `${baseURL}/tv/${subKinds}?api_key=${apiKEY}&page=${page}`;
}

export const apiDetailPath = (detailId: string, kind: number) => {
  const validate =
    kind < 20 ? `movie/${detailId}` :
    kind < 30 ? `tv/${detailId}` : '';
  return `${baseURL}/${validate}?api_key=${apiKEY}`;
}
