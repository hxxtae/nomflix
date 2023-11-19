import { dto } from '../apis';
import { contentGenres } from '../constants';

const IMAGE_PATH = "https://image.tmdb.org/t/p";

/**
 * Image URL
 * @param id 
 * @param format 
 * @returns 
 */
export function formatImagePath(id: string, format: string = 'original') {
  return `${IMAGE_PATH}/${format}${id}`;
};

/**
 * PUBLIC URL
 * @param deploy 
 * @returns 
 */
export function publicUrlStr(deploy: boolean = true) {
  if (deploy) return process.env.PUBLIC_URL;
  return '';
};

/**
 * Set Time (00:00)
 * @param num 
 * @returns 
 */
export const toTime = (num: number = 0) => {
  return `${Math.floor((num / 60)).toString().padStart(2, '0')}:${(num % 60).toString().padStart(2, '0')}`;
}

/**
 * Videos 필터링
 * @param datas 
 * @returns 
 */
export const videosKeySorting = (datas?: dto.IVideos[]) => {
  if (!datas?.length) return;

  const videos = datas.filter(item => item.type === "Trailer");
  if (!videos.length) return datas[datas.length - 1].key;
  return videos[videos.length - 1].key;
}

/**
 * Genres 필터링
 * @param genreArr 
 * @param kind 
 * @returns 
 */
export const genresFormat = (genreArr: number[], kind: number, length: number = 2) => {
  return genreArr.map(num =>
    contentGenres.genres.find(genre => genre.id === num)?.name ?? '')
    .slice(0, length)
    .join(' · ');
}

/**
 * Only Return String (undefined is '-')
 * @param data 
 * @returns 
 */
export const formatOfStr = (data: unknown): string => {
  if (typeof data === 'string' && data) return data;
  if (typeof data === 'number') return data.toString();

  return '-';
}
