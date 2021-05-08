import { createContext, useState, ReactNode, useContext, useRef, useEffect } from "react";

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
    episode: TEpisode;
    progress: number;
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
    handleSliderChange: (duration: number) => void;
};

type IPlayerProviderProps = {
    children: ReactNode;
}

export const PlayerContext = createContext({} as TPlayerContextData);

export function PlayerProvider({ children }: IPlayerProviderProps) {
    const [ episodeList, setEpisodeList ] = useState<TEpisode[]>([]);
    const [ currentEpisodeIndex, setCurrentEpisodeIndex ] = useState(0);
    const [ progress, setProgress] = useState(0);
    const [ isPlaying, setIsPlaying ] = useState(false);
    const [ looping, setLooping ] = useState(false);
    const [ shuffling, setShuffling ] = useState(false);

    const audioRef = useRef(null);

    const hasPrevious = currentEpisodeIndex > 0;
    const hasNext = shuffling || (currentEpisodeIndex + 1) < episodeList.length;
    const episode = episodeList[currentEpisodeIndex];

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

    function setupProgressListener() {
        audioRef.current.currentTime = 0;

        audioRef.current.addEventListener('timeupdate', () => setProgress(audioRef.current.currentTime)
        );
    }

    function handleSliderChange(duration: number) {
        audioRef.current.currentTime = duration;
        setProgress(duration);
    }

    function handleEpisodeEnded() {
        if(hasNext) {
            playNext();
        } else {
            clearPlayerState();
            setProgress(0);
        }
    }

    useEffect(() => {
        if (!audioRef.current) return;

        const action = isPlaying ? 'play' : 'pause';

        audioRef.current[action]();
    }, [isPlaying])

    return (
        <PlayerContext.Provider
            value={{
                episodeList,
                currentEpisodeIndex,
                episode,
                progress,
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
                clearPlayerState,
                handleSliderChange,
                }}>
            {children}

            { episode && (
                <audio
                    ref={audioRef}
                    src={episode.url}
                    onEnded={handleEpisodeEnded}
                    loop={looping}
                    onPlay={() => setPlayingState(true)}
                    onPause={() => setPlayingState(false)}
                    onLoadedMetadata={setupProgressListener}
                    autoPlay
                    />
                )}
        </PlayerContext.Provider>
    );
}

export const usePlayer = () => useContext(PlayerContext);