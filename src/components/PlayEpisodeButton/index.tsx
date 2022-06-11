import React from 'react';

import IconPlay from '../../assets/icons/play.svg';

import { Container } from './styles';

interface PlayEpisodeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  small?: boolean;
}

export function PlayEpisodeButton({
  small = false,
  type = 'button',
  ...rest
}: PlayEpisodeButtonProps) {
  return (
    <Container small={small} type={type} {...rest}>
      <IconPlay />
    </Container>
  );
}
