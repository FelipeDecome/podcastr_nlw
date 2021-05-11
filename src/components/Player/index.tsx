import 'rc-slider/assets/index.css';

import Image from 'next/image';
import Slider from 'rc-slider';

import IconNotPlaying from '../../assets/icons/not-playing.svg';
import IconPlaying from '../../assets/icons/playing.svg';
import { usePlayer } from '../../contexts/PlayerContext';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';
import { PlayerControls } from '../PlayerControls';
import styles from './styles.module.scss';

export function Player() {
    const { episode, progress, handleSliderChange } = usePlayer();

    return (
        <div className={styles.playerContainer}>
            {episode ? (
                <>
                    <header>
                        <IconPlaying />
                        <strong>Tocando agora</strong>
                    </header>

                    <div className={styles.currentEpisode}>
                        <Image width={592} height={592} src={episode.thumbnail} objectFit="cover" />
                        <strong>{episode.title}</strong>
                        <span>{episode.members}</span>
                    </div>
                </>
            ) : (
                <>
                    <header>
                        <IconNotPlaying />
                        <strong>Nada tocando</strong>
                    </header>

                    <div className={styles.emptyPlayer}>
                        <strong>Selecione um podcast para ouvir</strong>
                    </div>
                </>
            )}

            <footer className={!episode ? styles.empty : ''}>
                <div className={styles.progress}>
                    <span>{convertDurationToTimeString(progress)}</span>
                    <div className={styles.slider}>
                        {episode ? (
                            <Slider
                                max={episode?.duration}
                                value={progress}
                                onChange={handleSliderChange}
                                trackStyle={{ backgroundColor: '#03D8E5' }}
                                railStyle={{ backgroundColor: '#822B80' }}
                                handleStyle={{ borderColor: '#03D8E5' }}
                            />
                        ) : (
                            <div className={styles.emptySlider} />
                        )}
                    </div>
                    <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
                </div>

                <PlayerControls hasEpisode={!!episode} />
            </footer>
        </div>
    );
}
