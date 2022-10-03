import { useQuery } from 'react-query';
import { IGetDataResult, IData } from './dto';

interface IDataFetch {
  isLoading: boolean;
  datas?: IData[];
}

/**
 * -- Data select of Custom Hook --
 * @param { IGetDataResult[] | undefined } data
 * @returns { IData[] | [] } 
 */
const dataFetch = ( data?: IGetDataResult[] ): IData[] => {  
  return data?.length ?
      [ ...data[0].results,
        ...data[1].results,
        ...data[2].results] : [];
};

// Custom Hook
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
