import Image from 'next/image';
import Link from 'next/link';

import IconPlayGreen from '../../assets/icons/play-green.svg';
import { usePlayer } from '../../contexts/PlayerContext';
import styles from './styles.module.scss';

type TEpisode = {
    id: string;
    title: string;
    members: string;
    publishedAt: string;
    thumbnail: string;
    duration: number;
    parsedDuration: string;
    url: string;
};

type TEpisodeTableProps = {
    episodeList: TEpisode[];
    allEpisodes: TEpisode[];
};

export function EpisodeTable({ episodeList, allEpisodes }: TEpisodeTableProps) {
    const { playEpisodeList } = usePlayer();

    return (
        <table className={styles.table} cellSpacing={0}>
            <thead>
                <tr>
                    <th></th>
                    <th>Podcast</th>
                    <th>Data</th>
                    <th className={styles.hiddenOn_SM}>Duração</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                {episodeList.map((episode, index, array) => {
                    const episodeIndex = index + (allEpisodes.length - array.length);

                    return (
                        <tr key={episode.id}>
                            <td
                                style={{
                                    width: 72
                                }}>
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

                            <td
                                className={styles.hiddenOn_XS_SM}
                                style={{
                                    width: 100
                                }}>
                                {episode.publishedAt}
                            </td>
                            <td className={styles.hiddenOn_SM}>{episode.parsedDuration}</td>
                            <td>
                                <button
                                    type="button"
                                    onClick={() => playEpisodeList(allEpisodes, episodeIndex)}>
                                    <IconPlayGreen />
                                </button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
