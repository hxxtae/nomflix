import { useQuery } from 'react-query';
import { IGetDataResult, IData, IGetDetail } from './dto';

interface IDataFetch {
  isLoading: boolean;
  datas?: IData[];
}

interface IDetailDataFetch {
  isLoading: boolean;
  data?: IGetDetail;
}

/**
 * -----------------------------
 * Data select of Custom Hook
 * -----------------------------
 * @param { IGetDataResult[] | undefined } data
 * @returns { IData[] | [] } 
 */
const dataFetch = ( data?: IGetDataResult[] ): IData[] => {  
  if (data?.length === 0) {
    return [];
  }
  const totalResultObj: IData[] = data!
    .map(parentObj => [...parentObj.results])
    .reduce((prev, curr) => [...prev, ...curr]);
  return totalResultObj;
  // [
  //   ...data[0].results,
  //   ...data[1].results,
  //   ...data[2].results,
  // ]
};

// Custom Hook of Slider
export const useDataFetch = (keyArr: readonly string[], callback: Function): IDataFetch => {
  const { isLoading, data } = useQuery([...keyArr], () => callback(), {
    staleTime: 60000,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    select: (data?: IGetDataResult[]) => {
      return dataFetch(data);
    }
  });
  
  return { isLoading, datas: data };
}

// Custom Hook of Detail
export const useDetailDataFetch = (keyArr: readonly string[], callback: Function): IDetailDataFetch => {
  const { isLoading, data } = useQuery([...keyArr], () => callback(), {
    refetchOnWindowFocus: false,
  });

  return { isLoading, data };
}
