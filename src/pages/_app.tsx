import { AppProps } from 'next/app';

import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { MinifiedPlayer } from '../components/MinifiedPlayer';
import { Player } from '../components/Player';

import { AppProvider } from '../contexts/AppContext';

import useWindowSize from '../hooks/useWindowSize';

import { Wrapper } from '../styles/components/App';
import GlobalStyle from '../styles/globalStyle';

function MyApp({ Component, pageProps }: AppProps) {
  const { width } = useWindowSize();

  return (
    <AppProvider>
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
    </AppProvider>
  );
}

export default MyApp;
