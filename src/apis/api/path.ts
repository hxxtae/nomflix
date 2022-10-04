const baseURL = process.env.REACT_APP_BASE_PATH;
const apiKEY = process.env.REACT_APP_API_KEY;

type IMovieKinds = 'now_playing' | 'popular' | 'top_rated' | 'latest' | 'upcoming';
type ITvKinds = 'on_the_air';

export const apiMoviePath = (page: number, subKinds: IMovieKinds) => {
  const kind = 'movie';
  return `${baseURL}/${kind}/${subKinds}?api_key=${apiKEY}&page=${page}`;
}

export const apiTvPath = (page: number, subKinds: ITvKinds) => {
  const kind = 'tv';
  return `${baseURL}/${kind}/${subKinds}?api_key=${apiKEY}&page=${page}`;
}

export const apiDetailPath = (movieid?: string, tvid?: string) => {
  const validate = movieid ? `movie/${movieid}` : tvid ? `tv/${tvid}` : '';
  return `${baseURL}/${validate}?api_key=${apiKEY}`;
}
