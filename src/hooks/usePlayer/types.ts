export type Episode = {
  id: string;
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

export interface PlayerContextValue {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  episode: Episode;
  progress: number;
  isPlaying: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
  looping: boolean;
  shuffling: boolean;
  play: (episode: Episode) => void;
  togglePlay: () => void;
  setPlayingState: (state: boolean) => void;
  playEpisodeList: (list: Episode[], index: number) => void;
  playNext: () => void;
  playPrevious: () => void;
  toggleLoop: () => void;
  toggleShuffle: () => void;
  clearPlayerState: () => void;
  handleSliderChange: (duration: number) => void;
}
