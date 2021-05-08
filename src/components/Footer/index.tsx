import styles from './styles.module.scss';

export function Footer() {
    return (
        <div className={styles.footerContainer}>
            <a href="https://www.github.com/felipedecome" target="_blank" rel="noreferrer">
                <img src="/github.svg" alt="Github" />
                Desenvolvido por
                <span>&nbsp;Felipe Decome</span>.
            </a>

            <a
                className={styles.listenNotesCredit}
                href="https://www.listennotes.com/"
                target="_blank"
                rel="noreferrer">
                <img src="/listen-notes-credits.png" alt="Listen Notes" />
            </a>
        </div>
    );
}
