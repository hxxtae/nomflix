// ----------------------------
// Interface
// ----------------------------
// Movie & TV interface
export interface IData {
  id: number;
  name: string;
  first_air_date: string;
  backdrop_path: string;
  poster_path: string;
  title: string;
  original_name: string;
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
