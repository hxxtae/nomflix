const API_KEY = "ce41ccaab71298ec7349b99aef4909e2";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
};

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export function getMovies(page: number) {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&page=${page}`).then(
    response => response.json()
  );
}

export function getPopular(page: number) {
  return fetch(`${BASE_PATH}/movie/popular?api_key=${API_KEY}&page=${page}`).then(
    response => response.json()
  );
}

export function getTop(page: number) {
  return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&page=${page}`).then(
    response => response.json()
  );
}

export function getLatest() {
  return fetch(`${BASE_PATH}/movie/latest?api_key=${API_KEY}`).then(
    response => response.json()
  );
}

export function getUpcoming(page: number) {
  return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&page=${page}`).then(
    response => response.json()
  );
}



interface ICompany {
  id: number;
  logo_path: string;
  name: string;
}

export interface IGetMovieDetail {
  production_companies: ICompany[];
  release_date: string;
  production_countries: {
    name: string;
  }[];
}

export function getDetail(movieId?: string) {
  return fetch(`${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}`).then(
    response => response.json()
  );
}
