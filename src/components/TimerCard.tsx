import { useRef, useState, useEffect } from "react";
import { useBearStore } from "../store";
import PlayIcon from "../icons/PlayIcon";
import PauseIcon from "../icons/PauseIcon";
import ForwardIcon from "../icons/FowardIcon";
import RestartIcon from "../icons/RestartIcon";
import MinusIcon from "../icons/MinusIcon";

const TIMER_QUEUE = [
  { duration: 25 * 60, type: "focus" },
  { duration: 5 * 60, type: "break" },

  { duration: 25 * 60, type: "focus" },
  { duration: 5 * 60, type: "break" },

  { duration: 25 * 60, type: "focus" },
  { duration: 5 * 60, type: "break" },

  { duration: 25 * 60, type: "focus" },
  { duration: 20 * 60, type: "break" },
];

export default function TimerCard() {
  const setShowTimer = useBearStore((state) => state.setShowTimer);

  const current_queue = [...TIMER_QUEUE];
  const [countDownTimer, setCountDownTimer] = useState(
    current_queue[0]["duration"]
  );

  const [play, setPlay] = useState(false);

  const [length, setLength] = useState(
    5 - current_queue.filter((item) => item.type === "focus").length
  );

  let intervalRef = useRef<number | undefined>();

  const startTimer = () => {
    setPlay(true);
    clearInterval(intervalRef.current);
    let shifted = false;
    intervalRef.current = setInterval(() => {
      setCountDownTimer((prev) => {
        if (prev === 0) {
          if (!shifted) {
            current_queue.shift();
          }
          setLength(
            5 - current_queue.filter((item) => item.type === "focus").length
          );
          shifted = true;
          return current_queue[0]["duration"];
        } else {
          shifted = false;
          return prev - 1;
        }
      });
    }, 1000);
  };

  const pauseTimer = () => {
    setPlay(false);
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startTimer();
  }, []);

  const min = Math.floor(countDownTimer / 60)
    .toString()
    .padStart(2, "0");

  const seconds = Math.floor(countDownTimer % 60)
    .toString()
    .padStart(2, "0");

  return (
    <div className="absolute inset-0 flex justify-center items-center z-10 bg-black bg-opacity-50">
      <div className="bg-columnBackgroundColor w-[500px] h-[500px] max-h-[500px] rounded-md items-center justify-center flex flex-col">
        <h2 className="text-6xl font-bold text-center py-2">Pomodoro</h2>
        <h1 className="text-9xl font-bold text-center py-2">{`${min}:${seconds}`}</h1>
        <p className="py-2">Focus!</p>
        <p className="py-2">{length} of 4 Sessions</p>
        <div>
          {/* Play/Pause Button */}
          {!play ? (
            <button
              className="px-4 opacity-60 hover:opacity-100"
              onClick={() => startTimer()}
            >
              <PlayIcon />
            </button>
          ) : (
            <button
              onClick={() => pauseTimer()}
              className="px-4 opacity-60 hover:opacity-100"
            >
              <PauseIcon />
            </button>
          )}
          <button className="px-4 opacity-60 hover:opacity-100">
            <ForwardIcon />
          </button>
          <button className="px-4 opacity-60 hover:opacity-100">
            <RestartIcon />
          </button>
          {/* Close Timer Button */}
          <button
            className="px-4 stroke-white opacity-60 hover:opacity-100"
            onClick={() => setShowTimer(false)}
          >
            <MinusIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
