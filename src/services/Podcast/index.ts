import { api } from '../api';

type Episode = {
  id: string;
  link: string;
  audio: string;
  image: string;
  title: string;
  thumbnail: string;
  description: string;
  pub_date_ms: number;
  listennotes_url: string;
  audio_length_sec: number;
  explicit_content: boolean;
  maybe_audio_invalid: boolean;
};

type Podcast = {
  id: string;
  rss: string;
  type: string;
  email: string;
  extra: {
    spotify_url: string;
    youtube_url: string;
  };
  image: string;
  title: string;
  country: string;
  website: string;
  episodes: Episode[];
  language: string;
  publisher: string;
  thumbnail: string;
  description: string;
  total_episodes: number;
  explicit_content: boolean;
  latest_episode_id: string;
  latest_pub_date_ms: number;
  earliest_pub_date_ms: number;
};

export const Podcast = {
  get: async (id: string) => {
    const { data } = await api.get<Podcast>(`/podcasts/${id}`);

    return data;
  },
};
