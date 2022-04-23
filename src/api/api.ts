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

export interface IGetDetail {
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
export async function getNowPlay(page: number) {
  return fetch(`${process.env.REACT_APP_BASE_PATH}/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`).then(
    response => response.json()
  );
}

export async function getNowPlayAll() {
  return Promise.all([getNowPlay(1), getNowPlay(2), getNowPlay(3)]);
}

export async function getPopular(page: number) {
  return fetch(`${process.env.REACT_APP_BASE_PATH}/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`).then(
    response => response.json()
  );
}

export async function getPopularAll() {
  return Promise.all([getPopular(1), getPopular(2), getPopular(3)]);
}

export async function getTop(page: number) {
  return fetch(`${process.env.REACT_APP_BASE_PATH}/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`).then(
    response => response.json()
  );
}

export async function getTopAll() {
  return Promise.all([getTop(1), getTop(2), getTop(3)]);
}

export async function getLatest() {
  return fetch(`${process.env.REACT_APP_BASE_PATH}/movie/latest?api_key=${process.env.REACT_APP_API_KEY}`).then(
    response => response.json()
  );
}

export async function getUpcoming(page: number) {
  return fetch(`${process.env.REACT_APP_BASE_PATH}/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`).then(
    response => response.json()
  );
}

export async function getUpcomingAll() {
  return Promise.all([getUpcoming(1), getUpcoming(2), getUpcoming(3)]);
}

// Tv api
export async function getTvOnAir(page: number) {
  return await (await fetch(`${process.env.REACT_APP_BASE_PATH}/tv/on_the_air?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`)).json();
}

export async function getTvOnAirAll() {
  return Promise.all([getTvOnAir(1), getTvOnAir(2), getTvOnAir(3)]);
}

// Movie & Tv Detail api
export async function getDetail(movieId?: string, tvId?: string) {
  return fetch(`${process.env.REACT_APP_BASE_PATH}/${detailValidate(movieId, tvId)}?api_key=${process.env.REACT_APP_API_KEY}`).then(
    response => response.json()
  );
}

function detailValidate(movieid?: string, tvid?: string) {
  return movieid ? `movie/${movieid}` : tvid ? `tv/${tvid}` : '';
}
