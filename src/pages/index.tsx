import { GetStaticProps } from 'next';
import Head from 'next/head';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { EpisodeCard } from '../components/EpisodeCard';
import { EpisodeTable } from '../components/EpisodeTable';

import { usePlayer } from '../contexts/PlayerContext';

import { PodcastService } from '../services/Podcast';

import { Container } from '../styles/components/Home';

import { convertDurationToTimeString } from '../utils/convertDurationToTimeString';
import { parseString } from '../utils/parseString';

type Episode = {
  id: string;
  title: string;
  podcastInfo: {
    title: string;
    publisher: string;
  };
  members: string;
  publishedAt: string;
  thumbnail: string;
  duration: number;
  parsedDuration: string;
  url: string;
  description: string;
};

interface HomeProps {
  latestEpisodes: Episode[];
  allEpisodes: Episode[];
}

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
  const { playEpisodeList } = usePlayer();

  const episodeList = [...latestEpisodes, ...allEpisodes];

  return (
    <Container>
      <Head>
        <title>Home | Podcastr</title>
      </Head>

      <section className="latestEpisodes">
        <h2>últimos lançamentos</h2>

        <ul>
          {latestEpisodes.map((episode, index) => (
            <EpisodeCard
              key={episode.id}
              episode={episode}
              onButtonClick={() => playEpisodeList(episodeList, index)}
            />
          ))}
        </ul>
      </section>

      <section className="allEpisodes">
        <h2>Todos os episódios</h2>

        <EpisodeTable episodeList={allEpisodes} allEpisodes={episodeList} />
      </section>
    </Container>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const podcast = await PodcastService.get('618f72ea42f94904bd29cfc1a6edc8b1');

  const episodes = podcast.episodes.map(episode => {
    return {
      id: episode.id,
      podcastInfo: {
        title: podcast.title,
        publisher: podcast.publisher,
      },
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: 'Juquinha, Aninha e Trevor',
      publishedAt: format(new Date(episode.pub_date_ms), 'd MMM yy', {
        locale: ptBR,
      }),
      duration: episode.audio_length_sec,
      parsedDuration: convertDurationToTimeString(
        Number(episode.audio_length_sec),
      ),
      url: episode.audio,
      description: parseString(episode.description),
    };
  });

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);

  return {
    props: {
      latestEpisodes,
      allEpisodes,
    },
    revalidate: 60 * 60 * 8,
  };
};
