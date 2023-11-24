export enum MovieCategory {
  "NowPlaying" = 11,
  "Popular" = 12,
  "Top" = 13,
  "Upcoming" = 14,
  "Similar" = 15,
  "Search" = 16,
  "Mylist" = 17,
  "Ranking" = 18,
  "Movie" = 20,
}

export enum TvCategory {
  "OnAir" = 21,
  "Popular" = 22,
  "Top" = 23,
  "AiringToday" = 24,
  "Similar" = 25,
  "Search" = 26,
  "Mylist" = 27,
  "Ranking" = 28,
  "Tv" = 30,
}

export const queryKinds = {
  movie: ['NowPlaying', 'Popular', 'Top', 'Upcoming', 'Similar', 'Search', 'Mylist', 'Ranking'],
  tv: ['OnAir', 'Popular', 'Top', 'AiringToday', 'Similar', 'Search', 'Mylist', 'Ranking']
};

export const queryKey = {
  movie: {
    all: ['movie'] as const,
    nowPlaying: () => [...queryKey.movie.all, queryKinds.movie[0]] as const,
    popular: () => [...queryKey.movie.all, queryKinds.movie[1]] as const,
    top: () => [...queryKey.movie.all, queryKinds.movie[2]] as const,
    upcoming: () => [...queryKey.movie.all, queryKinds.movie[3]] as const,
    similar: (movie_id: string) => [...queryKey.movie.all, queryKinds.movie[4], movie_id] as const,
    search: (query: string) => [...queryKey.movie.all, query] as const,
    ranking: () => [...queryKey.movie.all, queryKinds.movie[7]] as const,
  },
  tv: {
    all: ['tv'] as const,
    onAir: () => [...queryKey.tv.all, queryKinds.tv[0]] as const,
    popular: () => [...queryKey.tv.all, queryKinds.tv[1]] as const,
    top: () => [...queryKey.tv.all, queryKinds.tv[2]] as const,
    airingToday: () => [...queryKey.tv.all, queryKinds.tv[3]] as const,
    similar: (tv_id: string) => [...queryKey.tv.all, queryKinds.tv[4], tv_id] as const,
    search: (query: string) => [...queryKey.tv.all, query] as const,
    ranking: () => [...queryKey.tv.all, queryKinds.tv[7]] as const,
  },
  detail: {
    all: ['detail'] as const,
    content: (detail_id: string) => [...queryKey.detail.all, detail_id] as const,
  }
}

// - 노트북 : 1400px~
// - 태블릿 가로(L) : 1181px ~ 1399ox
// - 태블릿 가로(M) : 768px ~ 1180px
// - 모바일 가로 & 태블릿 세로 : 500px ~ 767px
// - 모바일 : ~499px
export const mediaScreenSize = {
  pc: {
    MAX: Infinity,
    MIN: 1400
  },
  tabletL: {
    MAX: 1399,
    MIN: 1181
  },
  tablet: {
    MAX: 1180,
    MIN: 768
  },
  mobile: {
    MAX: 767,
    MIN: 500
  },
  mobileS: {
    MAX: 499,
    MIN: 0
  }
}
