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
  movie: ['NowPlaying', 'Popular', 'Top', 'Upcoming'],
  tv: ['OnAir', 'Popular', 'Top', 'AiringToday']
};

export const queryKey = {
  movie: {
    all: ['movie'] as const,
    nowPlaying: () => [...queryKey.movie.all, queryKinds.movie[0]] as const,
    popular: () => [...queryKey.movie.all, queryKinds.movie[1]] as const,
    top: () => [...queryKey.movie.all, queryKinds.movie[2]] as const,
    upcoming: () => [...queryKey.movie.all, queryKinds.movie[3]] as const,
  },
  tv: {
    all: ['tv'] as const,
    onAir: () => [...queryKey.tv.all, queryKinds.tv[0]] as const,
    popular: () => [...queryKey.tv.all, queryKinds.tv[1]] as const,
    top: () => [...queryKey.tv.all, queryKinds.tv[2]] as const,
    airingToday: () => [...queryKey.tv.all, queryKinds.tv[3]] as const,
  },
  detail: {
    all: ['detail'] as const,
  }
}