import '../utils/replaceAllPolyfill';

import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { MinifiedPlayer } from '../components/MinifiedPlayer';
import { Player } from '../components/Player';
import { PlayerProvider } from '../contexts/PlayerContext';
import useWindowSize from '../hooks/useWindowSize';
import GlobalStyle from '../styles/globalStyle';
import { Wrapper } from './components/App';

function MyApp({ Component, pageProps }) {
    const { width } = useWindowSize();

    return (
        <PlayerProvider>
            <Wrapper>
                <main>
                    <Header />
                    {width < 1440 && <MinifiedPlayer />}
                    <Component {...pageProps} />
                    <Footer />
                </main>

                {width >= 1440 && <Player />}
            </Wrapper>
            <GlobalStyle />
        </PlayerProvider>
    );
}

export default MyApp;
