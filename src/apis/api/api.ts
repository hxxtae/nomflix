import { apiDetailPath, apiMoviePath, apiTvPath } from './path';

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
// (3) Top
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
export async function getTvOnAir(page: number) {
  return (await fetch(apiTvPath(page, 'on_the_air'))).json();
}

export async function getTvOnAirAll() {
  return Promise.all([getTvOnAir(1), getTvOnAir(2), getTvOnAir(3)]);
}
// --------------------------
// Movie & Tv Detail api
// --------------------------
export async function getDetail(movieId?: string, tvId?: string) {
  return fetch(apiDetailPath(movieId, tvId)).then(
    response => response.json()
  );
}
