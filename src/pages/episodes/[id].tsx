import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { ParsedUrlQuery } from 'querystring';

import IconArrowLeft from '../../assets/icons/arrow-left.svg';
import IconPlay from '../../assets/icons/play.svg';

import { usePlayer } from '../../hooks/usePlayer';

import { EpisodeService } from '../../services/Episode';

import { Container } from '../../styles/components/Episodes';
import { Paragraph } from '../../styles/components/Text';

import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';

type Episode = {
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

interface EpisodeProps {
  episode: Episode;
}

export default function Episode({ episode }: EpisodeProps) {
  const { play } = usePlayer();

  return (
    <Container>
      <Head>
        <title>{episode.title} | Podcastr</title>
      </Head>

      <div>
        <div className="thumbnailContainer">
          <Link href="/">
            <button type="button">
              <IconArrowLeft />
            </button>
          </Link>

          <Image
            width={1440}
            height={320}
            src={episode.thumbnail}
            alt={episode.title}
            objectFit="cover"
          />

          <button type="button" onClick={() => play(episode)}>
            <IconPlay />
          </button>
        </div>

        <header>
          <h1>{episode.title}</h1>
          <span>{episode.members}</span>
          <span>{episode.publishedAt}</span>
          <span>{episode.parsedDuration}</span>
        </header>

        <Paragraph
          className="description"
          dangerouslySetInnerHTML={{
            __html: episode.description,
          }}
        ></Paragraph>
      </div>
    </Container>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

interface IParams extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps<
  EpisodeProps,
  IParams
> = async context => {
  const { id } = context.params!;

  const response = await EpisodeService.get(id);

  const episode = {
    id: response.id,
    title: response.title,
    thumbnail: response.thumbnail,
    members: 'Juquinha, Aninha e Trevor',
    publishedAt: format(new Date(response.pub_date_ms), 'd MMM yy', {
      locale: ptBR,
    }),
    duration: response.audio_length_sec,
    parsedDuration: convertDurationToTimeString(
      Number(response.audio_length_sec),
    ),
    description: response.description,
    url: response.audio,
  };

  return {
    props: {
      episode,
    },
    revalidate: 60 * 60 * 24, // 24 hours,
  };
};
