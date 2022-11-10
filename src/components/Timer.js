function Timer({ time, twoDigits, isSession }) {
  const timeObj = function calculateMinutesAndSeconds() {
    return {
      minutes: Math.floor(time / 60),
      seconds: time % 60,
    };
  };
  const { minutes, seconds } = timeObj();
  return (
    <div className="timer-component">
      <h1 id="timer-label">{isSession ? 'Session' : 'Break'}</h1>
      <p id="time-left">{`${twoDigits(minutes)}:${twoDigits(seconds)}`}</p>
    </div>
  );
}

export default Timer;
