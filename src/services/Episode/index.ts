import { api } from '../api';

type Episode = {
  id: string;
  link: string;
  audio: string;
  image: string;
  title: string;
  thumbnail: string;
  description: string;
  transcript: string;
  pub_date_ms: number;
  guid_from_rss: string;
  audio_length_sec: number;
  explicit_content: boolean;
  maybe_audio_invalid: boolean;
};

export const EpisodeService = {
  get: async (id: string) => {
    const { data } = await api.get<Episode>(`/episodes/${id}`);

    return data;
  },
};
