import React, { useEffect, useState } from 'react'

type Props = {}

const TimerComponent = (props: Props) => {
  const [timerValue, setTimerValue] = useState(0);

  const startTimer = () => {
    const intervalId = setInterval(() => {
      setTimerValue((prevValue) => prevValue + 1);
    }, 1000);
    return intervalId;
  };

  return (
    <>
      <div>
        <p>타이머 : {timerValue} 초</p>
      </div>
      <button onClick={() => {
        const intervalId = startTimer();
      }}>시작</button>
    </>
  );
}

export default TimerComponent;