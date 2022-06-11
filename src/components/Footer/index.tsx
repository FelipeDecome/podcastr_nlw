import Image from 'next/image';
import { useTheme } from 'styled-components';

import IconGithub from '../../assets/icons/github.svg';

import { Container } from './styles';

export function Footer() {
  const theme = useTheme();

  return (
    <Container>
      <a
        href="https://www.github.com/felipedecome"
        target="_blank"
        rel="noreferrer"
      >
        <IconGithub />
        Desenvolvido por
        <span>&nbsp;Felipe Decome</span>.
      </a>

      <a
        className="listenNotesCredit"
        href="https://www.listennotes.com/"
        target="_blank"
        rel="noreferrer"
      >
        <Image
          width={240}
          height={24}
          src={
            theme.title === 'light'
              ? '/listen-notes-credits.png'
              : '/listen-notes-credits-dark.png'
          }
          alt="Listen Notes"
          objectFit="contain"
        />
      </a>
    </Container>
  );
}
