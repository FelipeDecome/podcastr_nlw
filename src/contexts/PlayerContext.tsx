import { createContext, useState, ReactNode, useMemo, useContext } from "react";

type TEpisode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
};

type TPlayerContextData = {
    episodeList: TEpisode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    hasNext: boolean;
    hasPrevious: boolean;
    looping: boolean;
    shuffling: boolean;
    play: (episode: TEpisode) => void;
    togglePlay: () => void;
    setPlayingState: (state: boolean) => void;
    playEpisodeList: (list: TEpisode[], index: number) => void;
    playNext: () => void;
    playPrevious: () => void;
    toggleLoop: () => void;
    toggleShuffle: () => void;
    clearPlayerState: () => void;
};

type IPlayerProviderProps = {
    children: ReactNode;
}

export const PlayerContext = createContext({} as TPlayerContextData);

export function PlayerProvider({ children }: IPlayerProviderProps) {
    const [ episodeList, setEpisodeList ] = useState([]);
    const [ currentEpisodeIndex, setCurrentEpisodeIndex ] = useState(0);
    const [ isPlaying, setIsPlaying ] = useState(false);
    const [ looping, setLooping ] = useState(false);
    const [ shuffling, setShuffling ] = useState(false);
    
    function play(episode: TEpisode) {
      setEpisodeList([episode])
      setCurrentEpisodeIndex(0);
      setIsPlaying(true);
    }

    function playEpisodeList(list: TEpisode[], index: number) {
        setEpisodeList(list);
        setCurrentEpisodeIndex(index)
        setIsPlaying(true);
    }

    function togglePlay() {
        setIsPlaying(state => !state);
    }

    function setPlayingState(state: boolean) {
        setIsPlaying(state);
    }

    const hasPrevious = useMemo(() => currentEpisodeIndex > 0, [currentEpisodeIndex])
    const hasNext = useMemo(() => shuffling || (currentEpisodeIndex + 1) < episodeList.length, [currentEpisodeIndex, episodeList, shuffling]);

    function playNext() {
        if(shuffling) {
            const randomNextEpisode = (Math.floor(Math.random() * (episodeList.length - 1)));

            setCurrentEpisodeIndex(randomNextEpisode);
            return;
        }

        if (hasNext)
            setCurrentEpisodeIndex(state => state + 1);
    }

    function playPrevious() {
        if (hasPrevious)
            setCurrentEpisodeIndex(state => state - 1);
    }

    function toggleLoop() {
        setLooping(state => !state);
    }

    function toggleShuffle() {
        setShuffling(state => !state);
    }

    function clearPlayerState() {
        setEpisodeList([])
        setCurrentEpisodeIndex(0)
    }

    return (
        <PlayerContext.Provider
            value={{
                episodeList,
                currentEpisodeIndex,
                isPlaying,
                hasNext,
                hasPrevious,
                looping,
                shuffling,
                play,
                togglePlay,
                setPlayingState,
                playEpisodeList,
                playNext,
                playPrevious,
                toggleLoop,
                toggleShuffle,
                clearPlayerState
                }}>
            {children}
        </PlayerContext.Provider>
    );
}

export const usePlayer = () => useContext(PlayerContext);