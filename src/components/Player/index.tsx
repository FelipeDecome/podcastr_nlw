import 'rc-slider/assets/index.css';

import Image from 'next/image';
import Slider from 'rc-slider';

import IconNotPlaying from '../../assets/icons/not-playing.svg';
import IconPlaying from '../../assets/icons/playing.svg';
import { usePlayer } from '../../contexts/PlayerContext';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';
import { PlayerControls } from '../PlayerControls';
import { Container } from './styles';

export function Player() {
    const { episode, progress, handleSliderChange } = usePlayer();

    return (
        <Container className="playerContainer">
            {episode ? (
                <>
                    <header>
                        <IconPlaying />
                        <strong>Tocando agora</strong>
                    </header>

                    <div className="currentEpisode">
                        <Image width={592} height={592} src={episode.thumbnail} objectFit="cover" />
                        <strong>{episode.title}</strong>
                    </div>
                </>
            ) : (
                <>
                    <header>
                        <IconNotPlaying />
                        <strong>Nada tocando</strong>
                    </header>

                    <div className="emptyPlayer">
                        <strong>Selecione um podcast para ouvir</strong>
                    </div>
                </>
            )}

            <footer className={!episode ? 'empty' : ''}>
                <div className="progress">
                    <span>{convertDurationToTimeString(progress)}</span>
                    <div className="slider">
                        {episode ? (
                            <Slider
                                max={episode?.duration}
                                value={progress}
                                onChange={handleSliderChange}
                                trackStyle={{ backgroundColor: 'var(--secondary)' }}
                                railStyle={{ backgroundColor: 'var(--primary-lighter)' }}
                                handleStyle={{ borderColor: 'var(--secondary)' }}
                            />
                        ) : (
                            <div className="emptySlider" />
                        )}
                    </div>
                    <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
                </div>

                <PlayerControls hasEpisode={!!episode} />
            </footer>
        </Container>
    );
}
