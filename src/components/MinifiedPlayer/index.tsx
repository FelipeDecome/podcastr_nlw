import 'rc-slider/assets/index.css';

import Image from 'next/image';
import Slider from 'rc-slider';

import { usePlayer } from '../../contexts/PlayerContext';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';
import { PlayerControls } from '../PlayerControls';
import styles from './styles.module.scss';

export function MinifiedPlayer() {
    const { progress, episode, handleSliderChange } = usePlayer();

    return (
        <div className={styles.container}>
            {episode ? (
                <Image
                    width={488}
                    height={272}
                    src={episode.thumbnail}
                    alt={episode.title}
                    objectFit="cover"
                    className={styles.episodeImage}
                />
            ) : (
                <div className={styles.emptyPlayer}></div>
            )}

            <div className={styles.playerContent}>
                {episode ? (
                    <strong title={episode.title}>{episode.title}</strong>
                ) : (
                    <strong>Selecione um podcast para ouvir</strong>
                )}
                <div>
                    <div className={styles.controls}>
                        <PlayerControls hasEpisode={!!episode} isMinified />
                    </div>

                    <div className={[styles.progress, !episode && styles.empty].join(' ')}>
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
                </div>
            </div>
        </div>
    );
}
