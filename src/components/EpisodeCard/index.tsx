import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import IconPlayGreen from '../../assets/icons/play-green.svg';
import { Heading16, Paragraph } from '../../styles/components/Text';
import * as Card from './styles';

type TEpisode = {
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

type TEpisodeCardProps = {
    episode: TEpisode;
    onButtonClick: () => void;
};

export function EpisodeCard({ episode, onButtonClick }: TEpisodeCardProps) {
    return (
        <Card.Container>
            <Card.Header>
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

                <button type="button" onClick={onButtonClick}>
                    <IconPlayGreen />
                </button>
            </Card.Header>
            <hr />

            <Card.Content>
                <Link href={`/episodes/${episode.id}`}>
                    <a>
                        <Heading16 as="h3">{episode.title}</Heading16>
                    </a>
                </Link>
                <Paragraph>{episode.description}</Paragraph>
            </Card.Content>
            <Card.Footer>
                <span>{episode.publishedAt}</span>
                <span>{episode.parsedDuration}</span>
            </Card.Footer>
        </Card.Container>
    );
}
