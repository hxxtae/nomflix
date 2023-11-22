import { IContentDetailsData, IContentsData } from './dto';
import { apiContentPath, apiDetailPath, apiSearchPath } from './path';

// const apiAccessToken = process.env.REACT_APP_API_ACCESS_TOKEN;

// --------------------------
// Movie Content api 
// --------------------------
// - now_playing
// - popular
// - top_rated
// - upcoming
// --------------------------
// (1) Now Play
export async function getNowPlay(page: number): Promise<IContentsData> {
  return fetch(apiContentPath(page, 'movie', 'now_playing')).then(
    response => response.json()
  );
}
export async function getNowPlayAll() {
  return Promise.all([getNowPlay(1), getNowPlay(2), getNowPlay(3)]);
}
// (2) Popular
export async function getPopular(page: number): Promise<IContentsData> {
  return fetch(apiContentPath(page, 'movie', 'popular')).then(
    response => response.json()
  );
}
export async function getPopularAll() {
  return Promise.all([getPopular(1), getPopular(2), getPopular(3)]);
}
// (3) Top Rated
export async function getTop(page: number): Promise<IContentsData> {
  return fetch(apiContentPath(page, 'movie', 'top_rated')).then(
    response => response.json()
  );
}
export async function getTopAll() {
  return Promise.all([getTop(1), getTop(2), getTop(3)]);
}
// (4) Latest (disabled)
export async function getLatest(page: number) {
  return fetch(apiContentPath(page, 'movie', 'latest')).then(
    response => response.json()
  );
}
// (5) Upcoming
export async function getUpcoming(page: number): Promise<IContentsData> {
  return fetch(apiContentPath(page, 'movie', 'upcoming')).then(
    response => response.json()
  );
}
export async function getUpcomingAll() {
  return Promise.all([getUpcoming(2), getUpcoming(3)]);
}

// --------------------------
// Tv Content api
// --------------------------
// - on_the_air
// - popular
// - top_rated
// - airing_today
// --------------------------
// (1) On The Air 
export async function getTvOnAir(page: number): Promise<IContentsData> {
  return (await fetch(apiContentPath(page, 'tv', 'on_the_air'))).json();
}

export async function getTvOnAirAll() {
  return Promise.all([getTvOnAir(1), getTvOnAir(2), getTvOnAir(3)]);
}

// (2) Popular
export async function getTvPopular(page: number): Promise<IContentsData> {
  return (await fetch(apiContentPath(page, 'tv', 'popular'))).json();
}

export async function getTvPopularAll() {
  return Promise.all([getTvPopular(2), getTvPopular(1), getTvPopular(3)]);
}

// (3) Top rated
export async function getTvTop(page: number): Promise<IContentsData> {
  return (await fetch(apiContentPath(page, 'tv', 'top_rated'))).json();
}

export async function getTvTopAll() {
  return Promise.all([getTvTop(1), getTvTop(2), getTvTop(3)]);
}

// (4) Airing Today
export async function getTvAiringToday(page: number): Promise<IContentsData> {
  return (await fetch(apiContentPath(page, 'tv', 'airing_today'))).json();
}

export async function getTvAiringTodayAll() {
  return Promise.all([getTvAiringToday(1), getTvAiringToday(2), getTvAiringToday(3)]);
}

// --------------------------
// Movie Content api
// --------------------------
// - similar
// --------------------------
// (1) Similar
export async function getMovieSimilar(page: number, movie_id: string): Promise<IContentsData> {
  return fetch(apiContentPath(page, 'movie', 'similar', {
    request_id: movie_id,
  })).then(
    response => response.json()
  );
}

export async function getMovieSimilarAll(movie_id: string) {
  return Promise.all([getMovieSimilar(1, movie_id)]);
}

// --------------------------
// Tv Content api
// --------------------------
// - similar
// --------------------------
// (1) Similar
export async function getTvSimilar(page: number, tv_id: string): Promise<IContentsData> {
  return (await fetch(apiContentPath(page, 'tv', 'similar', {
    request_id: tv_id,
  }))).json();
}

export async function getTvSimilarAll(tv_id: string) {
  return Promise.all([getTvSimilar(1, tv_id)]);
}

// --------------------------
// Movie & Tv Content Detail api
// --------------------------
export async function getDetail(detail_id: string, kind: number): Promise<IContentDetailsData> {
  return fetch(apiDetailPath(detail_id, kind)).then(
    response => response.json()
  );
}

// --------------------------
// Movie & Tv Content Search api
// --------------------------
export async function getMovieSearch(page: number, query: string): Promise<IContentsData> {
  return (await fetch(apiSearchPath(page, 'movie', query))).json();
}

export async function getMovieSearchAll(query: string) {
  return Promise.all([getMovieSearch(1, query), getMovieSearch(2, query)]);
}

export async function getTvSearch(page: number, query: string): Promise<IContentsData> {
  return (await fetch(apiSearchPath(page, 'tv', query))).json();
}

export async function getTvSearchAll(query: string) {
  return Promise.all([getTvSearch(1, query), getTvSearch(2, query)]);
}



