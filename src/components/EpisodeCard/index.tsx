import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import styles from './styles.module.scss';

type TEpisode = {
    id: string;
    title: string;
    members: string;
    publishedAt: string;
    thumbnail: string;
    duration: number;
    parsedDuration: string;
};

type TEpisodeCardProps = {
    episode: TEpisode;
    onButtonClick: () => void;
};

export function EpisodeCard({ episode, onButtonClick }: TEpisodeCardProps) {
    return (
        <li className={styles.cardContainer}>
            <Image
                width={192}
                height={192}
                src={episode.thumbnail}
                alt={episode.title}
                objectFit="cover"
            />
            <div className={styles.episodeDetails}>
                <Link href={`/episodes/${episode.id}`}>
                    <a>{episode.title}</a>
                </Link>
                <p>{episode.members}</p>
                <span>{episode.publishedAt}</span>
                <span>{episode.parsedDuration}</span>
            </div>

            <button type="button" onClick={onButtonClick}>
                <img src="/play-green.svg" alt="Tocar episódio" />
            </button>
        </li>
    );
}
