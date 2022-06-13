import Image from 'next/image';
import { useTheme } from 'styled-components';

import Slider, { SliderProps } from 'rc-slider';
import { SliderRef } from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';

import { usePlayer } from '../../hooks/usePlayer';

import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';

import { PlayerControls } from '../PlayerControls';

import { Container } from './styles';

const SliderWithCorrectTypes = Slider as React.ForwardRefExoticComponent<
  SliderProps<number> & React.RefAttributes<SliderRef>
>;

export function MinifiedPlayer() {
  const { progress, episode, handleSliderChange } = usePlayer();
  const { primary, secondary } = useTheme();

  return (
    <Container>
      {episode ? (
        <div>
          <Image
            width={244}
            height={120}
            src={episode.thumbnail}
            alt={episode.title}
            objectFit="cover"
            className="episodeImage"
          />
        </div>
      ) : (
        <div className="emptyPlayer"></div>
      )}

      <div className="playerContent">
        {episode ? (
          <strong title={episode.title}>{episode.title}</strong>
        ) : (
          <strong>Selecione um podcast para ouvir</strong>
        )}
        <div>
          <div className="controls">
            <PlayerControls hasEpisode={!!episode} isMinified />
          </div>

          <div
            className={['progress', !episode ? 'empty' : undefined].join(' ')}
          >
            <span>{convertDurationToTimeString(progress)}</span>
            <div className="slider">
              {episode ? (
                <SliderWithCorrectTypes
                  max={episode?.duration}
                  value={progress}
                  onChange={handleSliderChange}
                  trackStyle={{ backgroundColor: secondary }}
                  railStyle={{ backgroundColor: primary.light }}
                  handleStyle={{ borderColor: secondary }}
                />
              ) : (
                <div className="emptySlider" />
              )}
            </div>
            <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
          </div>
        </div>
      </div>
    </Container>
  );
}
