import { useQuery } from 'react-query';

import { dto } from '../../apis';

interface IContentDetailResponse {
  isLoading: boolean;
  data?: dto.IContentDetailsData;
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
