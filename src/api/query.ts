import { IGetDataResult } from './api';

export const movieDataFetch = ( loading: boolean, data: IGetDataResult[] | undefined ) => {  
  return loading ?
    [] : data ?
      [ ...data[0].results,
        ...data[1].results,
        ...data[2].results] : [];
};
