import { useState, useEffect, useRef } from 'react';
import Session from './components/Session';
import Break from './components/Break';
import Timer from './components/Timer';
import Control from './components/Control';
import './App.css';
import beepSound from './audio/BeepSound.wav';

function App() {
  const [sessionLength, setSessionLength] = useState(1500);
  const [breakLength, setBreakLength] = useState(300);
  const [isPaused, setIsPaused] = useState(true);
  const [isSession, setIsSession] = useState(true);
  const [timeLeft, setTimeLeft] = useState(1500);
  const [audioBeep, setAudioBeep] = useState();

  function resetTimer() {
    setSessionLength(1500);
    setBreakLength(300);
    setTimeLeft(1500);
    setIsPaused(true);
    setIsSession(true);
    audioBeep.pause();
    audioBeep.currentTime = 0;
  }

  // Start pause timer
  function startPause() {
    setIsPaused((prevVal) => !prevVal);
  }

  // Increment session and break
  function increment(event) {
    const clickedId = event.target.id;

    if (clickedId.includes('session')) {
      if (sessionLength < 3600) {
        setSessionLength((prevVal) => prevVal + 60);
        setTimeLeft((prevVal) => prevVal + 60);
      } else {
        setSessionLength(3600);
        setTimeLeft(3600);
      }
    } else if (clickedId.includes('break')) {
      if (breakLength < 3600) {
        setBreakLength((prevVal) => prevVal + 60);
        if (!isSession) {
          setTimeLeft((prevVal) => prevVal + 60);
        }
      }
    }
  }

  // Decrement session and break
  function decrement(event) {
    const clickedId = event.target.id;

    if (clickedId.includes('session')) {
      if (sessionLength > 60) {
        setSessionLength((prevVal) => prevVal - 60);
        setTimeLeft((prevVal) => prevVal - 60);
      } else {
        setSessionLength(60);
        setTimeLeft(60);
      }
    } else if (clickedId.includes('break')) {
      if (breakLength > 60) {
        setBreakLength((prevVal) => prevVal - 60);
        if (!isSession) {
          setTimeLeft((prevVal) => prevVal - 60);
        }
      }
    }
  }

  // Play audio
  function playAudio() {
    audioBeep.play();
  }

  // Toggle between session and break
  function toggle() {
    if (isSession) {
      setIsSession((prevVal) => !prevVal);
      setTimeLeft(breakLength);
    } else {
      setIsSession((prevVal) => !prevVal);
      setTimeLeft(sessionLength);
    }
  }

  // Countdown function
  function timer() {
    if (!isPaused) {
      setTimeLeft((prevVal) => prevVal - 1);
    }
    if (timeLeft === 0) {
      playAudio();
      toggle();
    }
  }

  // source: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  useInterval(() => timer(), !isPaused ? 1000 : null);

  // https://stackoverflow.com/a/2998874/1673761
  const twoDigits = (num) => String(num).padStart(2, '0');

  return (
    <div className="container">
      <div className="length-controllers">
        <Session
          incrementSession={increment}
          decrementSession={decrement}
          sessionLength={sessionLength}
        />
        <Break
          incrementBreak={increment}
          decrementBreak={decrement}
          breakLength={breakLength}
        />
      </div>
      <Timer time={timeLeft} twoDigits={twoDigits} isSession={isSession} />
      <Control reset={resetTimer} startPause={startPause} paused={isPaused} />
      {/* audio from Peter Weinberg site */}
      <audio
        id="beep"
        preload="auto"
        src={beepSound}
        ref={(audio) => setAudioBeep(audio)}
      />
    </div>
  );
}

export default App;

// "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
