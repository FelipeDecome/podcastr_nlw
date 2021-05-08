import Image from 'next/image';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { usePlayer } from '../../contexts/PlayerContext';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';
import { PlayerControls } from '../PlayerControls';

import styles from './styles.module.scss';

export function MinifiedPlayer() {
    const {
        progress,
        episode,
        handleSliderChange,
    } = usePlayer();

    return (
        <div className={styles.container}>
            {episode
            ? (
                <Image 
                    width={488}
                    height={272}
                    src={episode.thumbnail}
                    alt={episode.title}
                    objectFit='cover'
                    className={styles.episodeImage}
                />
            ) : 
                <div className={styles.emptyPlayer}></div>
            }

            <div className={styles.playerContent}>
                {episode ? (
                    <div className={styles.episodeDetails}>
                        <strong title={episode.title}>{episode.title}</strong>
                        <span title={episode.members}>{episode.members}</span>
                    </div>
                ) :
                    <strong>Selecione um podcast para ouvir</strong>
                }                
                <div>
                    <div className={styles.controls}>
                        <PlayerControls hasEpisode={!!episode} isMinified />
                    </div>

                    <div className={[styles.progress, !episode && styles.empty].join(' ')}>
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
                </div>

            </div>

        </div>
    )
}