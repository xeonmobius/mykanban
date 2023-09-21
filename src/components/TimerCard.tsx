export default function TimerCard() {
  return (
    <div className="absolute inset-0 flex justify-center items-center z-10 bg-black bg-opacity-90">
      <div className="bg-columnBackgroundColor w-[500px] h-[500px] max-h-[500px] rounded-md items-center justify-center flex flex-col">
        <h2 className="text-6xl font-bold text-center py-2">Pomodoro</h2>
        <h1 className="text-9xl font-bold text-center py-2">25:00</h1>
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
