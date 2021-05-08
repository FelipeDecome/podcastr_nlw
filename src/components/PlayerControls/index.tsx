import { usePlayer } from '../../contexts/PlayerContext';
import styles from './styles.module.scss';

type TPlayerControlsProps = {
    hasEpisode: boolean;
    isMinified?: boolean;
};

export function PlayerControls({ hasEpisode, isMinified }: TPlayerControlsProps) {
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
        playPrevious
    } = usePlayer();

    return (
        <div className={[styles.buttonsContainer, isMinified ? styles.minified : ''].join(' ')}>
            <button
                type="button"
                disabled={!hasEpisode || episodeList.length === 1}
                onClick={toggleShuffle}
                className={shuffling ? styles.active : ''}>
                <img src="/shuffle.svg" alt="Embaralhar" />
            </button>

            <button type="button" disabled={!hasEpisode || !hasPrevious} onClick={playPrevious}>
                <img src="/play-previous.svg" alt="Tocar anterior" />
            </button>

            <button
                type="button"
                disabled={!hasEpisode}
                className={[styles.playButton, isPlaying ? styles.playing : ''].join(' ')}
                onClick={togglePlay}>
                {isPlaying ? (
                    <img src="/pause.svg" alt="Tocar" />
                ) : (
                    <img src="/play.svg" alt="Tocar" />
                )}
            </button>

            <button type="button" disabled={!hasEpisode || !hasNext} onClick={playNext}>
                <img src="/play-next.svg" alt="Tocar próximo" />
            </button>

            <button
                type="button"
                disabled={!hasEpisode}
                onClick={toggleLoop}
                className={looping ? styles.active : ''}>
                <img src="/repeat.svg" alt="Repetir" />
            </button>
        </div>
    );
}
