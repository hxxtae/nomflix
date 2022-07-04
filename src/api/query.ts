import { useQuery, UseQueryOptions } from 'react-query';
import { IGetDataResult } from './api';

const dataFetch = ( loading: boolean, data: IGetDataResult[] | undefined ) => {  
  return loading ?
    [] : data ?
      [ ...data[0].results,
        ...data[1].results,
        ...data[2].results] : [];
};

// Custom Hook
export const useDataFetch = (keyArr: string[], callback: Function) => {
  const { isLoading, data } = useQuery<IGetDataResult[]>([...keyArr], () => callback(), {
    refetchOnWindowFocus: false,
  });
  
  const datas = dataFetch(isLoading, data);
  return { isLoading, datas };
}
