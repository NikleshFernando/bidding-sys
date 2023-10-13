import { useEffect, useRef, useState } from "react";
import { FiClock } from "react-icons/fi";

const formatTime = (time) => {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time - minutes * 60);

  if (minutes <= 10) minutes = '0' + minutes;
  if (seconds <= 10) seconds = '0' + seconds;

  return minutes + ":" + seconds;
};

export default function TimerCountdown({ seconds }) {
  const [countdown, setCountdown] = useState(() => {
    const storedCountdown = localStorage.getItem("countdown");
    return storedCountdown ? parseInt(storedCountdown) : seconds;
  });
  const timerId = useRef();

  useEffect(() => {
    timerId.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 0) {
          clearInterval(timerId.current);
          alert("End");
          localStorage.removeItem("countdown");
          return 0;
        }
        localStorage.setItem("countdown", prev - 1);
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timerId.current);
    };
  }, []);

  return (
    <h2>
      <FiClock /> Timer: {formatTime(countdown)}
    </h2>
  );
}

