const convertDurationToTimeString = (duration: number): string => {

    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor(duration % 3600 / 60);
    const seconds = Math.floor(duration % 60);

    const timeString = [ hours, minutes, seconds]
        .filter((unit, index) => unit !== 0 || index !== 0)
        .map(unit => String(unit).padStart(2, '0'))
        .join(':');

    return timeString;
}

export { convertDurationToTimeString };