import IconPlayGreen from '../../assets/icons/play-green.svg';
import { Container } from './styles';

interface IPlayEpisodeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    small?: boolean;
}

export function PlayEpisodeButton({ small, type, ...rest }: IPlayEpisodeButtonProps) {
    return (
        <Container small={!!small} type={type || 'button'} {...rest}>
            <IconPlayGreen />
        </Container>
    );
}
