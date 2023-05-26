function convertTimeToSeconds(time) {
  const [hours, minutes, seconds] = time.split(':').map(Number);
  return {
    hours,
    minutes,
    seconds,
  };
}


function convertSecondsToHours(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return {
    hours,
    minutes,
  };
}


export { convertTimeToSeconds, convertSecondsToHours };