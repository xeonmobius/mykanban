import { useRef, useState, useEffect } from "react";
import { useBearStore } from "../store";

const TIMER_QUEUE = [
  { duration: 25 * 60, type: "focus" },
  { duration: 5 * 60, type: "break" },

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

  const [pause, setPause] = useState(false)
  let intervalRef = useRef();

  const decreaseTime = () => {
    setCountDownTimer((prev) => {
      if (prev === 0) {
        current_queue.shift();
        return current_queue[0]["duration"];
      }
      return prev - 1;
    });
  };

  const pauseTimer = () => {
    if (!pause) {
      clearInterval(intervalRef.current);
    } else {
      intervalRef.current = setInterval(decreaseTime, 1000);
    }
    setPause((prev) => !prev);
  }

  const min = Math.floor(countDownTimer / 60)
    .toString()
    .padStart(2, "0");

  const seconds = Math.floor(countDownTimer % 60)
    .toString()
    .padStart(2, "0");

  useEffect(() => {
    intervalRef.current = setInterval(decreaseTime, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="absolute inset-0 flex justify-center items-center z-10 bg-black bg-opacity-50">
      <div className="bg-columnBackgroundColor w-[500px] h-[500px] max-h-[500px] rounded-md items-center justify-center flex flex-col">
        {/* Close Timer Button */}
        <button onClick={() => setShowTimer(false)}>X</button>
        <h2 className="text-6xl font-bold text-center py-2">Pomodoro</h2>
        <h1 className="text-9xl font-bold text-center py-2">{`${min}:${seconds}`}</h1>
        <p className="py-2">Focus!</p>
        <p className="py-2">1 of 4 Sessions</p>
        <div>
          <button className="px-4">Start</button>
          <button className="px-4">Pause</button>
          <button className="px-4">Reset</button>
          <button className="px-4">Skip</button>
        </div>
      </div>
    </div>
  );
}
