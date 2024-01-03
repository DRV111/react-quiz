import { useEffect } from 'react';
import { useQuizz } from '../context/QuizzContext';

function Timer() {
  const { timeRemain, dispatch } = useQuizz();
  const mins = Math.floor(timeRemain / 60);
  const sec = timeRemain % 60;
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: 'tick' });
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {mins < 10 && '0'}
      {mins}:{sec < 10 && '0'}
      {sec}
    </div>
  );
}

export default Timer;
