const API_KEY = "ce41ccaab71298ec7349b99aef4909e2";
const BASE_PATH = "https://api.themoviedb.org/3";

// ----------------------------
// Interface
// ----------------------------
// Movie & TV interface
export interface IData {
  id: number;
  name: string;
  first_air_date: string;
  backdrop_path: string;
  poster_path: string;
  title: string;
  original_name: string;
  overview: string;
};

export interface IGetDataResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IData[];
  total_pages: number;
  total_results: number;
}

// Detail interface
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

// ----------------------------
// API
// ----------------------------
// Movie api
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
// Tv api
export async function getTvOntheAir(page: number) {
  return await (await fetch(`${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}&page=${page}`)).json();
}

// Movie & Tv Detail api
export function getDetail(movieId?: string) {
  return fetch(`${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}`).then(
    response => response.json()
  );
}
