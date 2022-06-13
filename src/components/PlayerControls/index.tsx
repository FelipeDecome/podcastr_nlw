import IconPause from '../../assets/icons/pause.svg';
import IconPlay from '../../assets/icons/play.svg';
import IconPlayNext from '../../assets/icons/play-next.svg';
import IconPlayPrevious from '../../assets/icons/play-previous.svg';
import IconRepeat from '../../assets/icons/repeat.svg';
import IconShuffle from '../../assets/icons/shuffle.svg';

import { usePlayer } from '../../hooks/usePlayer';

import { Container } from './styles';

type PlayerControlsProps = {
  hasEpisode: boolean;
  isMinified?: boolean;
};

export function PlayerControls({
  hasEpisode,
  isMinified,
}: PlayerControlsProps) {
  const {
    hasNext,
    hasPrevious,
    isPlaying,
    looping,
    shuffling,
    episodeList,
    togglePlay,
    toggleLoop,
    toggleShuffle,
    playNext,
    playPrevious,
  } = usePlayer();

  return (
    <Container className={isMinified ? 'minified' : ''}>
      <button
        type="button"
        disabled={!hasEpisode || episodeList.length === 1}
        onClick={toggleShuffle}
        className={shuffling ? 'active' : ''}
      >
        <IconShuffle />
      </button>

      <button
        type="button"
        disabled={!hasEpisode || !hasPrevious}
        onClick={playPrevious}
      >
        <IconPlayPrevious />
      </button>

      <button
        type="button"
        disabled={!hasEpisode}
        className={['playButton', isPlaying ? 'playing' : ''].join(' ')}
        onClick={togglePlay}
      >
        {isPlaying ? <IconPause /> : <IconPlay />}
      </button>

      <button
        type="button"
        disabled={!hasEpisode || !hasNext}
        onClick={playNext}
      >
        <IconPlayNext />
      </button>

      <button
        type="button"
        disabled={!hasEpisode}
        onClick={toggleLoop}
        className={looping ? 'active' : ''}
      >
        <IconRepeat />
      </button>
    </Container>
  );
}
