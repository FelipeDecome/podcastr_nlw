import IconPlay from '../../assets/icons/play.svg';
import { Container } from './styles';

interface IPlayEpisodeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  small?: boolean;
}

export function PlayEpisodeButton({
  small,
  type,
  ...rest
}: IPlayEpisodeButtonProps) {
  return (
    <Container small={!!small} type={type || 'button'} {...rest}>
      <IconPlay />
    </Container>
  );
}
