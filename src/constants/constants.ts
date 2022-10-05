export enum SliderCategory {
  "NowPlaying",
  "Popular",
  "Top",
  "Upcoming",
  "onAir",
}

export const queryKey = {
  movie: {
    all: ['movie'] as const,
    nowPlaying: () => [...queryKey.movie.all, 'nowPlaying'] as const,
    popular: () => [...queryKey.movie.all, 'popular'] as const,
    top: () => [...queryKey.movie.all, 'top'] as const,
    upcoming: () => [...queryKey.movie.all, 'upcoming'] as const,
  },
  tv: {
    all: ['tv'] as const,
    onAir: () => [...queryKey.tv.all, 'onAir'] as const,
  },
  detail: {
    all: ['detail'] as const,
  }
}