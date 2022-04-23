import { useQuery } from 'react-query';
import { IGetDataResult } from './api';

const movieDataFetch = ( loading: boolean, data: IGetDataResult[] | undefined ) => {  
  return loading ?
    [] : data ?
      [ ...data[0].results,
        ...data[1].results,
        ...data[2].results] : [];
};

// Custom Hook
export const useMovieFetch = (keyArr: string[], callback: Function) => {
  const { isLoading, data } = useQuery<IGetDataResult[]>([...keyArr], () => callback());
  const datas = movieDataFetch(isLoading, data);
  return { isLoading, datas };
}
