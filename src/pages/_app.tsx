import '../styles/global.scss';
import '../utils/replaceAllPolyfill';

import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { MinifiedPlayer } from '../components/MinifiedPlayer';
import { Player } from '../components/Player';
import { PlayerProvider } from '../contexts/PlayerContext';
import useWindowSize from '../hooks/useWindowSize';
import styles from '../styles/app.module.scss';

function MyApp({ Component, pageProps }) {
    const { width } = useWindowSize();

    return (
        <PlayerProvider>
            <div className={styles.wrapper}>
                <main>
                    <Header />
                    {width < 1440 && <MinifiedPlayer />}
                    <Component {...pageProps} />
                    <Footer />
                </main>

                {width >= 1440 && <Player />}
            </div>
        </PlayerProvider>
    );
}

export default MyApp;
