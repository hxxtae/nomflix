import { apiDetailPath, apiMoviePath, apiTvPath } from './path';

// const apiAccessToken = process.env.REACT_APP_API_ACCESS_TOKEN;

// --------------------------
// Movie api
// --------------------------
// (1) Now Play
export async function getNowPlay(page: number) {
  return fetch(apiMoviePath(page, 'now_playing')).then(
    response => response.json()
  );
}
export async function getNowPlayAll() {
  return Promise.all([getNowPlay(1), getNowPlay(2), getNowPlay(3)]);
}
// (2) Popular
export async function getPopular(page: number) {
  return fetch(apiMoviePath(page, 'popular')).then(
    response => response.json()
  );
}
export async function getPopularAll() {
  return Promise.all([getPopular(1), getPopular(2), getPopular(3)]);
}
// (3) Top Rated
export async function getTop(page: number) {
  return fetch(apiMoviePath(page, 'top_rated')).then(
    response => response.json()
  );
}
export async function getTopAll() {
  return Promise.all([getTop(1), getTop(2), getTop(3)]);
}
// (4) Latest (disabled)
export async function getLatest(page: number) {
  return fetch(apiMoviePath(page, 'latest')).then(
    response => response.json()
  );
}
// (5) Upcoming
export async function getUpcoming(page: number) {
  return fetch(apiMoviePath(page, 'upcoming')).then(
    response => response.json()
  );
}
export async function getUpcomingAll() {
  return Promise.all([getUpcoming(2), getUpcoming(3)]);
}

// --------------------------
// Tv api
// --------------------------
// (1) On The Air 
export async function getTvOnAir(page: number) {
  return (await fetch(apiTvPath(page, 'on_the_air'))).json();
}

export async function getTvOnAirAll() {
  return Promise.all([getTvOnAir(1), getTvOnAir(2), getTvOnAir(3)]);
}

// (2) Popular
export async function getTvPopular(page: number) {
  return (await fetch(apiTvPath(page, 'popular'))).json();
}

export async function getTvPopularAll() {
  return Promise.all([getTvPopular(1), getTvPopular(2), getTvPopular(3)]);
}

// (3) Top rated
export async function getTvTop(page: number) {
  return (await fetch(apiTvPath(page, 'top_rated'))).json();
}

export async function getTvTopAll() {
  return Promise.all([getTvTop(1), getTvTop(2), getTvTop(3)]);
}

// (4) Airing Today
export async function getTvAiringToday(page: number) {
  return (await fetch(apiTvPath(page, 'airing_today'))).json();
}

export async function getTvAiringTodayAll() {
  return Promise.all([getTvAiringToday(1), getTvAiringToday(2), getTvAiringToday(3)]);
}

// --------------------------
// Movie & Tv Detail api
// --------------------------
export async function getDetail(detailId: string, kind: number) {
  return fetch(apiDetailPath(detailId, kind)).then(
    response => response.json()
  );
}
