// ----------------------------
// Movie & TV Content Data interface
// ----------------------------
export interface IContentData {
  adult: boolean;
  genre_ids: number[];
  id: number;
  kind?: number;
  original_language: string;
  original_title: string;
  original_name: string;
  name: string;
  popularity: number;
  release_date: string;
  backdrop_path: string;
  poster_path: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  overview: string;
};

export interface IContentsData {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IContentData[];
  total_pages: number;
  total_results: number;
}

// ----------------------------
// Movie & TV Content Detail Data interface
// ----------------------------
export interface ICompany {
  id: number;
  logo_path: string;
  name: string;
}

export interface IGenres {
  id: number;
  name: string;
}

export interface IVideos {
  id: string;
  key: string;
  name: string;
  official: boolean;
  site: string;
  size: number;
  type: string;
}

export interface IContentDetailsData {
  first_air_date: string; // only tv
  genres: IGenres[];
  id: number;
  original_title: string; // only movie
  original_name: string;  // only tv
  overview: string;
  popularity: number;
  production_companies: ICompany[];
  production_countries: {
    name: string;
  }[];
  release_date: string; // only movie
  runtime: number; // only movie
  status: string;
  title: string; // only movie
  name: string;  // only tv
  vote_average: number;
  vote_count: number;
  videos: {
    results: IVideos[];
  }
}

export interface IProfilesData {
  id: number;
  name: string;
  background_path: string;
}