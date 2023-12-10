import { useEffect } from 'react';

function Timer({ dispatch, time }) {
  const mins = Math.floor(time / 60);
  const sec = time % 60;
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
