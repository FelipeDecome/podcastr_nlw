import Image from 'next/image';
import Link from 'next/link';

import IconPlayGreen from '../../assets/icons/play-green.svg';

import { Heading16, Paragraph } from '../../styles/components/Text';

import { PlayEpisodeButton } from '../PlayEpisodeButton';

import { Container, Content, Footer, Header } from './styles';

type Episode = {
  id: string;
  podcastInfo: {
    title: string;
    publisher: string;
  };
  title: string;
  publishedAt: string;
  thumbnail: string;
  duration: number;
  parsedDuration: string;
  description: string;
};

interface EpisodeCardProps {
  episode: Episode;
  onButtonClick: () => void;
}

export function EpisodeCard({ episode, onButtonClick }: EpisodeCardProps) {
  return (
    <Container>
      <Header>
        <div className="podcast-info">
          <div className="podcast-image">
            <Image
              width={192}
              height={192}
              src={episode.thumbnail}
              alt={episode.title}
              objectFit="cover"
            />
          </div>

          <div>
            <Heading16 as="h3">{episode.podcastInfo.title}</Heading16>
            <Paragraph>{episode.podcastInfo.publisher}</Paragraph>
          </div>
        </div>

        <PlayEpisodeButton type="button" onClick={onButtonClick}>
          <IconPlayGreen />
        </PlayEpisodeButton>
      </Header>
      <hr />

      <Content>
        <Link href={`/episodes/${episode.id}`}>
          <a>
            <Heading16 as="h3">{episode.title}</Heading16>
          </a>
        </Link>
        <Paragraph>{episode.description}</Paragraph>
      </Content>
      <Footer>
        <span>{episode.publishedAt}</span>
        <span>{episode.parsedDuration}</span>
      </Footer>
    </Container>
  );
}
