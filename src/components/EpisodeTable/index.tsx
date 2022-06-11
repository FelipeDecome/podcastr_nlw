import Image from 'next/image';
import Link from 'next/link';

import IconPlayGreen from '../../assets/icons/play-green.svg';

import { usePlayer } from '../../contexts/PlayerContext';

import { PlayEpisodeButton } from '../PlayEpisodeButton';

import { Container } from './styles';

type Episode = {
  id: string;
  title: string;
  members: string;
  publishedAt: string;
  thumbnail: string;
  duration: number;
  parsedDuration: string;
  url: string;
};

type EpisodeTableProps = {
  episodeList: Episode[];
  allEpisodes: Episode[];
};

export function EpisodeTable({ episodeList, allEpisodes }: EpisodeTableProps) {
  const { playEpisodeList } = usePlayer();

  return (
    <Container cellSpacing={0}>
      <thead>
        <tr>
          <th></th>
          <th>Podcast</th>
          <th className="hiddenOn_XS_SM">Data</th>
          <th className="hiddenOn_SM">Duração</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {episodeList.map((episode, index, array) => {
          const episodeIndex = index + (allEpisodes.length - array.length);

          return (
            <tr key={episode.id}>
              <td>
                <Image
                  width={120}
                  height={120}
                  src={episode.thumbnail}
                  alt={episode.title}
                  objectFit="cover"
                />
              </td>

              <td>
                <Link href={`/episodes/${episode.id}`}>
                  <a>{episode.title}</a>
                </Link>
              </td>

              <td className="hiddenOn_XS_SM">{episode.publishedAt}</td>
              <td className="hiddenOn_SM">{episode.parsedDuration}</td>
              <td>
                <PlayEpisodeButton
                  small
                  type="button"
                  onClick={() => playEpisodeList(allEpisodes, episodeIndex)}
                >
                  <IconPlayGreen />
                </PlayEpisodeButton>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Container>
  );
}
