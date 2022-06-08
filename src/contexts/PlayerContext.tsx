import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { localStorageConfig } from '../config/localStorage';

type TEpisode = {
  id: string;
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

type TPlayerContextData = {
  episodeList: TEpisode[];
  currentEpisodeIndex: number;
  episode: TEpisode;
  progress: number;
  isPlaying: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
  looping: boolean;
  shuffling: boolean;
  play: (episode: TEpisode) => void;
  togglePlay: () => void;
  setPlayingState: (state: boolean) => void;
  playEpisodeList: (list: TEpisode[], index: number) => void;
  playNext: () => void;
  playPrevious: () => void;
  toggleLoop: () => void;
  toggleShuffle: () => void;
  clearPlayerState: () => void;
  handleSliderChange: (duration: number) => void;
};

type IPlayerProviderProps = {
  children: ReactNode;
};

export const PlayerContext = createContext({} as TPlayerContextData);

export function PlayerProvider({ children }: IPlayerProviderProps) {
  const [episodeList, setEpisodeList] = useState<TEpisode[]>([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [looping, setLooping] = useState(false);
  const [shuffling, setShuffling] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const hasPrevious = currentEpisodeIndex > 0;
  const hasNext = shuffling || currentEpisodeIndex + 1 < episodeList.length;
  const episode = episodeList[currentEpisodeIndex];

  function play(episode: TEpisode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function playEpisodeList(list: TEpisode[], index: number) {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  function togglePlay() {
    setIsPlaying(state => !state);
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  function playNext() {
    if (shuffling) {
      const randomNextEpisode = Math.floor(
        Math.random() * (episodeList.length - 1),
      );

      setCurrentEpisodeIndex(randomNextEpisode);
      return;
    }

    if (hasNext) setCurrentEpisodeIndex(state => state + 1);
  }

  function playPrevious() {
    if (hasPrevious) setCurrentEpisodeIndex(state => state - 1);
  }

  function toggleLoop() {
    setLooping(state => !state);
  }

  function toggleShuffle() {
    setShuffling(state => !state);
  }

  function clearPlayerState() {
    setEpisodeList([]);
    setCurrentEpisodeIndex(0);
  }

  function setupProgressListener() {
    audioRef.current?.addEventListener('timeupdate', () =>
      setProgress(audioRef.current?.currentTime || 0),
    );
  }

  function handleSliderChange(duration: number) {
    if (audioRef.current) {
      audioRef.current.currentTime = duration;
      setProgress(duration);
    }
  }

  function handleEpisodeEnded() {
    if (hasNext) {
      playNext();
    } else {
      clearPlayerState();
      setProgress(0);
    }
  }

  useEffect(() => {
    if (!audioRef.current) return;

    const action = isPlaying ? 'play' : 'pause';

    audioRef.current[action]();
  }, [isPlaying]);

  useEffect(() => {
    const episode = episodeList[currentEpisodeIndex];

    if (episode && Math.floor(progress) % 10 === 0) {
      const key = `${localStorageConfig.prefix}:episode-${episode.id}`;
      const value = progress;

      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [currentEpisodeIndex, episodeList, progress]);

  useEffect(() => {
    const episode = episodeList[currentEpisodeIndex];

    if (episode) {
      const key = `${localStorageConfig.prefix}:episode-${episode.id}`;
      const storageValue = localStorage.getItem(key);

      if (storageValue && audioRef.current) {
        const savedProgress = Number(JSON.parse(storageValue));

        setProgress(savedProgress || 0);
        audioRef.current.currentTime = savedProgress || 0;
      }
    }
  }, [episodeList, currentEpisodeIndex]);

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        episode,
        progress,
        isPlaying,
        hasNext,
        hasPrevious,
        looping,
        shuffling,
        play,
        togglePlay,
        setPlayingState,
        playEpisodeList,
        playNext,
        playPrevious,
        toggleLoop,
        toggleShuffle,
        clearPlayerState,
        handleSliderChange,
      }}
    >
      {children}

      {episode && (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <audio
          ref={audioRef}
          src={episode.url}
          onEnded={handleEpisodeEnded}
          loop={looping}
          onPlay={() => setPlayingState(true)}
          onPause={() => setPlayingState(false)}
          onLoadedMetadata={setupProgressListener}
          autoPlay
        />
      )}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext);
