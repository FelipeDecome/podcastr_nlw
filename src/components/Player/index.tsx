import Image from 'next/image';

import Slider, { SliderProps } from 'rc-slider';
import { SliderRef } from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';

import IconNotPlaying from '../../assets/icons/not-playing.svg';
import IconPlaying from '../../assets/icons/playing.svg';

import { usePlayer } from '../../hooks/usePlayer';

import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';

import { PlayerControls } from '../PlayerControls';

import { Container } from './styles';

const SliderWithCorrectTypes = Slider as React.ForwardRefExoticComponent<
  SliderProps<number> & React.RefAttributes<SliderRef>
>;

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
            <div>
              <Image
                width={592}
                height={592}
                src={episode.thumbnail}
                alt={episode.title}
                objectFit="cover"
              />
            </div>
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
              <SliderWithCorrectTypes
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
