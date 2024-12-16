import { useState, useEffect } from "react";

const Timer = ({ initialTime, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      // Cleanup the interval when the component unmounts or time runs out
      return () => clearInterval(timer);
    } else {
      // Trigger the callback after timer runs out
      onTimeUp();
    }
  }, [timeLeft, onTimeUp]); // Re-run effect whenever timeLeft changes

  return (
    <div>
      <h3>Time Left: {timeLeft} seconds</h3>
    </div>
  );
};

export default Timer;
