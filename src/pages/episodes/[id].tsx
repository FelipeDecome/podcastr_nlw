import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { api } from '../../services/api';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';
import { usePlayer } from '../../contexts/PlayerContext';

import styles from './episode.module.scss';

type IEpisode = {
    id: string;
    title: string;
    members: string;
    publishedAt: string;
    thumbnail: string;
    duration: number;
    parsedDuration: string;
    description: string;
    url: string;
};

type TEpisodeProps = {
    episode: IEpisode;
};

export default function Episode({ episode }: TEpisodeProps) {
    const { play } = usePlayer();

    return (
        <div className={styles.episode}>
            <Head>
                <title>{episode.title} | Podcastr</title>
            </Head>

            <div className={styles.thumbnailContainer}>
                <Link href="/">                    
                    <button type="button">
                        <img src="/arrow-left.svg" alt="Voltar" />
                    </button>
                </Link>

                <Image
                width={700}
                height={160}
                src={episode.thumbnail}
                objectFit="cover" />

                <button
                    type="button"
                    onClick={() => play(episode)}>
                    <img src="/play.svg" alt="Tocar episodio" />
                </button>
            </div>

            <header>
                <h1>{episode.title}</h1>
                <span>{episode.members}</span>
                <span>{episode.publishedAt}</span>
                <span>{episode.parsedDuration}</span>
            </header>

            <div
                className={styles.description}
                dangerouslySetInnerHTML={{__html: episode.description}} />
        </div>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const { data } = await api.get(`episodes`, {
        params: {
          _limit: 2,
          _sort: 'published_at',
          _order: 'desc',
        }
      });

    const paths = data.map(episode => ({
        params: {
            id: episode.id,
        }
    }))

    return {
        paths,
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { id } = context.params;
    const { data } = await api(`/episodes/${id}`);
    
    const episode = {
        id: data.id,
        title: data.title,
        thumbnail: data.thumbnail,
        members: data.members,
        publishedAt: format(parseISO(data.published_at), 'd MMM yy', { 
          locale: ptBR,
        }),
        duration: Number(data.file.duration),
        parsedDuration: convertDurationToTimeString(Number(data.file.duration)),
        description: data.description,
        url: data.file.url,
      }

    return {
        props: {
            episode,
        },
        revalidate: 60 * 60 * 24,
    }
}
