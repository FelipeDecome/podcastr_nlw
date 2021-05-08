import { GetStaticProps } from "next";
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { format, parseISO} from 'date-fns';
import ptBR from "date-fns/locale/pt-BR";

import { EpisodeTable } from '../components/EpisodeTable';
import { usePlayer } from '../contexts/PlayerContext';
import { api } from "../services/api";
import { convertDurationToTimeString } from "../utils/convertDurationToTimeString";

import styles from './home.module.scss';
import { EpisodeCard } from "../components/EpisodeCard";

interface IEpisode {
  id: string;
  title: string;
  members: string;
  publishedAt: string;
  thumbnail: string;
  duration: number;
  parsedDuration: string;
  url: string;
}

type THomeProps = {
  latestEpisodes: IEpisode[];
  allEpisodes: IEpisode[];
}

export default function Home({ latestEpisodes, allEpisodes }: THomeProps) {
  const { playEpisodeList } = usePlayer();

  const episodeList = [...latestEpisodes, ...allEpisodes];

  return (
        <div className={styles.homepage}>

          <Head>
            <title>Home | Podcastr</title>
          </Head>

          <section className={styles.latestEpisodes}>
            <h2>últimos lançamentos</h2>
            
            <ul>
              {latestEpisodes.map((episode, index) => (
                  <EpisodeCard 
                    key={episode.id}
                    episode={episode}
                    onButtonClick={
                      () => playEpisodeList(episodeList, index)
                    } />
                )
              )}
            </ul>
          </section>

          <section className={styles.allEpisodes}>
            <h2>Todos os episódios</h2>

            <EpisodeTable episodeList={allEpisodes} allEpisodes={episodeList} />
          </section>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async () => {
  
  const { data } = await api.get('/podcasts/618f72ea42f94904bd29cfc1a6edc8b1');
  
  const episodes = data.episodes.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: 'Juquinha, Aninha e Trevor',
      publishedAt: format(new Date(episode.pub_date_ms), 'd MMM yy', { 
        locale: ptBR,
      }),
      duration: episode.audio_length_sec,
      parsedDuration: convertDurationToTimeString(Number(episode.audio_length_sec)),
      url: episode.audio,
    }
  });

 /*  const { data } = await api.get(`http://localhost:3333/episodes`, {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc',
    }
  });

  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', { 
        locale: ptBR,
      }),
      duration: Number(episode.file.duration),
      parsedDuration: convertDurationToTimeString(Number(episode.file.duration)),
      url: episode.file.url,
    }
  }) */

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.lenght);

  return {
    props: {
      latestEpisodes,
      allEpisodes
    },
    revalidate: 60 * 60 * 8,
  }  
}