import { useTheme } from 'styled-components';

import IconGithub from '../../assets/icons/github.svg';
import { Container } from './styles';

export function Footer() {
    const { title } = useTheme();

    return (
        <Container>
            <a href="https://www.github.com/felipedecome" target="_blank" rel="noreferrer">
                <IconGithub />
                Desenvolvido por
                <span>&nbsp;Felipe Decome</span>.
            </a>

            <a
                className="listenNotesCredit"
                href="https://www.listennotes.com/"
                target="_blank"
                rel="noreferrer">
                {title === 'light' ? (
                    <img src="/listen-notes-credits.png" alt="Listen Notes" />
                ) : (
                    <img src="/listen-notes-credits-dark.png" alt="Listen Notes" />
                )}
            </a>
        </Container>
    );
}
