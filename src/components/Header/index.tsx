import Link from 'next/link';
import Switch from 'react-switch';
import { useTheme } from 'styled-components';

import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

import Logo from '../../assets/icons/logo.svg';
import MoonIcon from '../../assets/icons/moon.svg';
import SunIcon from '../../assets/icons/sun.svg';

import { useAppTheme } from '../../hooks/useAppTheme';

import { Container } from './styles';

const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
  locale: ptBR,
});

export function Header() {
  const { item, text } = useTheme();

  const { theme, toggleTheme } = useAppTheme();

  return (
    <Container>
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>
      <p>O melhor para você ouvir, sempre</p>

      <span>{currentDate}</span>
      <div className="themeSwitchContainer">
        <SunIcon className={theme === 'light' ? 'active' : undefined} />
        <Switch
          height={12}
          width={32}
          activeBoxShadow={'0px 0px 6px 2px rgba(3, 216, 229, 0.4)'}
          handleDiameter={16}
          onColor={item.complement}
          offColor={item.complement}
          onHandleColor={text.default}
          offHandleColor={text.complement}
          checkedIcon={false}
          uncheckedIcon={false}
          checked={theme === 'dark'}
          onChange={toggleTheme}
        />
        <MoonIcon className={theme === 'dark' ? 'active' : undefined} />
      </div>
    </Container>
  );
}
