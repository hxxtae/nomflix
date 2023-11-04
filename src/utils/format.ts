const IMAGE_PATH = "https://image.tmdb.org/t/p";

export function formatImagePath(id: string, format: string = 'original') {
  return `${IMAGE_PATH}/${format}${id}`;
};

export function publicUrlStr(deploy: boolean = true) {
  if (deploy) return process.env.PUBLIC_URL;
  return '';
};

export const toTime = (num: number = 0) => {
  return `${Math.floor((num / 60)).toString().padStart(2, '0')}:${(num % 60).toString().padStart(2, '0')}`;
}