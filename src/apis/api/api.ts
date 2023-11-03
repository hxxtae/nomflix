import { IContentDetailsData, IContentsData } from '../dto';
import { apiDetailPath, apiMoviePath, apiTvPath } from './path';

// const apiAccessToken = process.env.REACT_APP_API_ACCESS_TOKEN;

// --------------------------
// Movie Content api
// --------------------------
// (1) Now Play
export async function getNowPlay(page: number): Promise<IContentsData> {
  return fetch(apiMoviePath(page, 'now_playing')).then(
    response => response.json()
  );
}
export async function getNowPlayAll() {
  return Promise.all([getNowPlay(1), getNowPlay(2), getNowPlay(3)]);
}
// (2) Popular
export async function getPopular(page: number): Promise<IContentsData> {
  return fetch(apiMoviePath(page, 'popular')).then(
    response => response.json()
  );
}
export async function getPopularAll() {
  return Promise.all([getPopular(1), getPopular(2), getPopular(3)]);
}
// (3) Top Rated
export async function getTop(page: number): Promise<IContentsData> {
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
export async function getUpcoming(page: number): Promise<IContentsData> {
  return fetch(apiMoviePath(page, 'upcoming')).then(
    response => response.json()
  );
}
export async function getUpcomingAll() {
  return Promise.all([getUpcoming(2), getUpcoming(3)]);
}

// --------------------------
// Tv Content api
// --------------------------
// (1) On The Air 
export async function getTvOnAir(page: number): Promise<IContentsData> {
  return (await fetch(apiTvPath(page, 'on_the_air'))).json();
}

export async function getTvOnAirAll() {
  return Promise.all([getTvOnAir(1), getTvOnAir(2), getTvOnAir(3)]);
}

// (2) Popular
export async function getTvPopular(page: number): Promise<IContentsData> {
  return (await fetch(apiTvPath(page, 'popular'))).json();
}

export async function getTvPopularAll() {
  return Promise.all([getTvPopular(1), getTvPopular(2), getTvPopular(3)]);
}

// (3) Top rated
export async function getTvTop(page: number): Promise<IContentsData> {
  return (await fetch(apiTvPath(page, 'top_rated'))).json();
}

export async function getTvTopAll() {
  return Promise.all([getTvTop(1), getTvTop(2), getTvTop(3)]);
}

// (4) Airing Today
export async function getTvAiringToday(page: number): Promise<IContentsData> {
  return (await fetch(apiTvPath(page, 'airing_today'))).json();
}

export async function getTvAiringTodayAll() {
  return Promise.all([getTvAiringToday(1), getTvAiringToday(2), getTvAiringToday(3)]);
}

// --------------------------
// Movie & Tv Content Detail api
// --------------------------
export async function getDetail(detailId: string, kind: number): Promise<IContentDetailsData> {
  return fetch(apiDetailPath(detailId, kind)).then(
    response => response.json()
  );
}
