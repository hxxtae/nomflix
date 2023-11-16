import { dto } from '../apis';

// --------------------------------------
// Get Contents of My List into Storage
// --------------------------------------
export const getContentsStorage = (storage_key: string): Map<number, dto.IContentData> => {
  const contentMap = localStorage.getItem(storage_key);
  if (!contentMap) return new Map();

  return new Map<number, dto.IContentData>(JSON.parse(contentMap));
}

// --------------------------------------
// Set Content of My List into Storage
// --------------------------------------
export const addContentStorage = (storage_key: string, storage_data: dto.IContentData) => {
  const contentMap = getContentsStorage(storage_key);
  contentMap.set(storage_data.id, storage_data);
  localStorage.setItem(storage_key, JSON.stringify(Array.from(contentMap.entries())));
  return contentMap;
}

// --------------------------------------
// Delete Content of My List into Storage
// --------------------------------------
export const deleteContentStorage = (storage_key: string, delete_id: number) => {
  const contentMap = getContentsStorage(storage_key);
  if (!contentMap.get(delete_id)) return contentMap;

  contentMap.delete(delete_id);
  localStorage.setItem(storage_key, JSON.stringify(Array.from(contentMap.entries())));
  return contentMap;
}

