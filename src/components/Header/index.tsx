import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import Link from 'next/link';

import Logo from '../../assets/icons/logo.svg';
import { Container } from './styles';

export function Header() {
    const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
        locale: ptBR
    });

    return (
        <Container>
            <Link href="/">
                <a>
                    <Logo />
                </a>
            </Link>
            <p>O melhor para você ouvir, sempre</p>

            <span>{currentDate}</span>
        </Container>
    );
}
