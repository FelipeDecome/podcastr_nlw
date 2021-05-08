import '../styles/global.scss';

import { Header } from '../components/Header';
import { Player } from '../components/Player';

import styles from '../styles/app.module.scss';
import { PlayerProvider } from '../contexts/PlayerContext';
import useWindowSize from '../hooks/useWindowSize';
import { MinifiedPlayer } from '../components/MinifiedPlayer';
import { Footer } from '../components/Footer';

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
          
          {width >= 1440 &&<Player />}
      </div>
    </PlayerProvider>
  )
}

export default MyApp
