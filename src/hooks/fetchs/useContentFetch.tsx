import { useQuery } from 'react-query';

import { dto } from '../../apis'

interface IContentResponse {
  isLoading: boolean;
  datas?: dto.IContentData[];
}

/**
 * -----------------------------
 * Data Combine of Content Fetch
 * -----------------------------
 * @param { dto.IContentsData[] | undefined } data
 * @returns { dto.IContentData[] } 
 */
const dataFetch = (data: dto.IContentsData[]): dto.IContentData[] => {
  const totalResultObj: dto.IContentData[] = data
    .map(parentObj => [...parentObj.results])
    .reduce((prev, curr) => [...prev, ...curr]);
  
  return totalResultObj;
};
// data example...
// [
//   ...data[0].results,
//   ...data[1].results,
//   ...data[2].results,
// ]

// -----------------------------
// Custom Hook of Content Fetch
// -----------------------------
export const useContentFetch = (keyArr: readonly string[], callback: Function): IContentResponse => {
  const { isLoading, data } = useQuery([...keyArr], () => callback(), {
    staleTime: 1000 * 60 * 20,
    cacheTime: 1000 * 60 * 20,
    refetchOnWindowFocus: false,
    retry: 0,
    select: (data: dto.IContentsData[]) => {
      return dataFetch(data);
    }
  });
  
  return { isLoading, datas: data };
}