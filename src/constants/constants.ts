export enum MovieCategory {
  "NowPlaying" = 10,
  "Popular" = 11,
  "Top" = 12,
  "Upcoming" = 13,
}

export enum TvCategory {
  "OnAir" = 20,
  "Popular" = 21,
  "Top" = 22,
  "AiringToday" = 23,
}

export const queryKinds = {
  movie: ['NowPlaying', 'Popular', 'Top', 'Upcoming, Similar, Credits'],
  tv: ['OnAir', 'Popular', 'Top', 'AiringToday, Similar, Credits']
};

export const queryKey = {
  movie: {
    all: ['movie'] as const,
    nowPlaying: () => [...queryKey.movie.all, queryKinds.movie[0]] as const,
    popular: () => [...queryKey.movie.all, queryKinds.movie[1]] as const,
    top: () => [...queryKey.movie.all, queryKinds.movie[2]] as const,
    upcoming: () => [...queryKey.movie.all, queryKinds.movie[3]] as const,
    similar: (movie_id: string) => [...queryKey.movie.all, queryKinds.movie[4], movie_id] as const,
  },
  tv: {
    all: ['tv'] as const,
    onAir: () => [...queryKey.tv.all, queryKinds.tv[0]] as const,
    popular: () => [...queryKey.tv.all, queryKinds.tv[1]] as const,
    top: () => [...queryKey.tv.all, queryKinds.tv[2]] as const,
    airingToday: () => [...queryKey.tv.all, queryKinds.tv[3]] as const,
    similar: (tv_id: string) => [...queryKey.tv.all, queryKinds.tv[4], tv_id] as const,
  },
  detail: {
    all: ['detail'] as const,
  }
}

// - 노트북 & 태블릿 가로 : 1181px~
// - 태블릿 가로 : 768px ~ 1180px
// - 모바일 가로 & 태블릿 세로 : ~767px
export const mediaScreenSize = {
  pc: {
    MAX: Infinity,
    MIN: 1181
  },
  tablet: {
    MAX: 1180,
    MIN: 768
  },
  mobile: {
    MAX: 767,
    MIN: 0
  }
}
