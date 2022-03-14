const IMAGE_PATH = "https://image.tmdb.org/t/p";

export function makeImagePath(id: string, format: string = 'original') {
  return `${IMAGE_PATH}/${format}${id}`;
};
