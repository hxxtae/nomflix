// ----------------------------
// Interface
// ----------------------------
// Movie & TV interface
export interface IData {
  adult: boolean;
  genre_ids: [];
  id: number;
  original_language: string;
  original_title: string;
  original_name: string;
  name: string;
  //first_air_date: string;
  popularity: number;
  release_data: string;
  backdrop_path: string;
  poster_path: string;
  title: string;
  video: boolean;
  bvote_average: number;
  vote_count: number;
  //original_name: string;
  overview: string;
};

export interface IGetDataResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IData[];
  total_pages: number;
  total_results: number;
}

// Detail interface
interface ICompany {
  id: number;
  logo_path: string;
  name: string;
}

export interface IGetDetail {
  production_companies: ICompany[];
  release_date: string;
  production_countries: {
    name: string;
  }[];
}
