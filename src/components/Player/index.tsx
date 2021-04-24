import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { usePlayer } from '../../contexts/PlayerContext';
import styles from './styles.module.scss';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';

type TEpisode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
};

export function Player() {
    const {
        episodeList,
        currentEpisodeIndex,
        isPlaying,
        hasNext,
        hasPrevious,
        looping,
        shuffling,
        togglePlay,
        setPlayingState,
        playNext,
        playPrevious,
        toggleLoop,
        toggleShuffle,
        clearPlayerState,
    } = usePlayer();
    const [ episode, setEpisode ] = useState<TEpisode>(null);
    const [ progress, setProgress] = useState(0);

    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        setEpisode(episodeList[currentEpisodeIndex]);
    }, [episodeList, currentEpisodeIndex])

    useEffect(() => {
        if (!audioRef.current) return;

        const action = isPlaying ? 'play' : 'pause';

        audioRef.current[action]();
    }, [isPlaying])

    function setupProgressListener() {
        audioRef.current.currentTime = 0;

        audioRef.current.addEventListener('timeupdate', () => setProgress(audioRef.current.currentTime)
        );
    }

    function handleSliderChange(duration: number) {
        audioRef.current.currentTime = duration;
        setProgress(duration);
    }

    function handleEpisodeEnded() {
        if(hasNext) {
            playNext();
        } else {
            clearPlayerState()
        }
    }

    return (
        <div className={styles.playerContainer}>
            <header>
                <img src="/playing.svg" alt="Tocando agora"/>
                <strong>Tocando agora </strong>
            </header>

            { episode ? (
                <div className={styles.currentEpisode}>
                    <Image
                        width={592}
                        height={592}
                        src={episode.thumbnail}
                        objectFit='cover' 
                        />
                    <strong>{episode.title}</strong>
                    <span>{episode.members}</span>
                </div>
                ) : (
                <div className={styles.emptyPlayer}>
                    <strong>Selecione um podcast para ouvir</strong>
                </div>
                )
            }

            <footer className={!episode && styles.empty}>
                <div className={styles.progress}>
                    <span>{convertDurationToTimeString(progress)}</span>
                    <div className={styles.slider}>
                        { episode ? (
                            <Slider
                                max={episode?.duration}
                                value={progress}
                                onChange={handleSliderChange}
                                trackStyle={{ backgroundColor: '#04d361'}}
                                railStyle={{ backgroundColor: '#9f75ff'}}
                                handleStyle={{ borderColor: '#04d361'}}
                                />
                        ) : (
                            <div className={styles.emptySlider} />
                        )}
                    </div>
                    <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
                </div>

                { episode && (
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

                <div className={styles.buttons}>
                    <button
                        type="button"
                        disabled={!episode || episodeList.length === 1}
                        onClick={toggleShuffle}
                        className={shuffling && styles.active}
                        >
                        <img src="/shuffle.svg" alt="Embaralhar"/>
                    </button>

                    <button
                        type="button"
                        disabled={!episode || !hasPrevious}
                        onClick={playPrevious}
                        >
                        <img src="/play-previous.svg" alt="Tocar anterior"/>
                    </button>

                    <button
                        type="button"
                        disabled={!episode}
                        className={[
                            styles.playButton,
                            isPlaying && styles.playing
                            ].join(' ')}
                        onClick={togglePlay}
                        >
                        { isPlaying
                            ? <img src="/pause.svg" alt="Tocar"/>
                            : <img src="/play.svg" alt="Tocar"/>    
                        }
                    </button>

                    <button
                        type="button"
                        disabled={!episode || !hasNext}
                        onClick={playNext}
                        >
                        <img src="/play-next.svg" alt="Tocar próximo"/>
                    </button>

                    <button
                        type="button"
                        disabled={!episode}
                        onClick={toggleLoop}
                        className={looping && styles.active}
                        >
                        <img src="/repeat.svg" alt="Repetir"/>
                    </button>
                </div>
            </footer>
        </div>
    );
}