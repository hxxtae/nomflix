export const queryKinds = {
  movie: ['NowPlaying', 'Popular', 'Top', 'Upcoming'],
  tv: ['OnAir']
};

export enum MovieCategory {
  "NowPlaying" = 10,
  "Popular" = 11,
  "Top" = 12,
  "Upcoming" = 13,
}

export enum TvCategory {
  "OnAir" = 20,
}

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
  },
  detail: {
    all: ['detail'] as const,
  }
}