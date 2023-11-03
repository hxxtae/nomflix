import { useQuery } from 'react-query';
import { IContentsData, IContentData, IContentDetailsData } from './dto';

interface IContentResponse {
  isLoading: boolean;
  datas?: IContentData[];
}

interface IContentDetailResponse {
  isLoading: boolean;
  data?: IContentDetailsData;
}

/**
 * -----------------------------
 * Data Combine of Content Fetch
 * -----------------------------
 * @param { IContentsData[] | undefined } data
 * @returns { IContentData[] } 
 */
const dataFetch = (data: IContentsData[]): IContentData[] => {
  const totalResultObj: IContentData[] = data
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
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    retry: 0,
    select: (data: IContentsData[]) => {
      return dataFetch(data);
    }
  });
  
  return { isLoading, datas: data };
}

// -----------------------------
// Custom Hook of Content-Detail Fetch
// -----------------------------
export const useContentDetailFetch = (keyArr: readonly string[], callback: Function): IContentDetailResponse => {
  const { isLoading, data } = useQuery([...keyArr], () => callback(), {
    refetchOnWindowFocus: false,
    retry: 0,
  });

  return { isLoading, data };
}
