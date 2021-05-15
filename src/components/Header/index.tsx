import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import Link from 'next/link';
import Switch from 'react-switch';
import { useTheme } from 'styled-components';

import Logo from '../../assets/icons/logo.svg';
import { useApp } from '../../contexts/AppContext';
import { Container } from './styles';

export function Header() {
    const { secondary, item, text } = useTheme();

    const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
        locale: ptBR
    });

    const { theme, toggleTheme } = useApp();

    return (
        <Container>
            <Link href="/">
                <a>
                    <Logo />
                </a>
            </Link>
            <p>O melhor para você ouvir, sempre</p>

            <span>{currentDate}</span>
            <Switch
                height={12}
                width={48}
                activeBoxShadow={'0px 0px 6px 2px rgba(3, 216, 229, 0.4)'}
                handleDiameter={16}
                onColor={item.complement}
                offColor={item.complement}
                onHandleColor={secondary}
                offHandleColor={text.complement}
                checkedIcon={false}
                uncheckedIcon={false}
                checked={theme === 'dark'}
                onChange={toggleTheme}
            />
        </Container>
    );
}
