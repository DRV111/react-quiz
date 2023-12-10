function FinishScreen({ points, sumOfPoints }) {
  const percentage = (points / sumOfPoints) * 100;
  let emoji;

  if (percentage === 100) {
    emoji = '🏆';
  }
  if (percentage >= 80 && percentage < 100) {
    emoji = '🥇';
  }
  if (percentage >= 50 && percentage < 80) {
    emoji = '😎';
  }
  if (percentage >= 0 && percentage < 50) {
    emoji = '🤨';
  }
  if (percentage > 0) {
    emoji = '🤕';
  }
  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{' '}
        {sumOfPoints} ({Math.ceil(percentage)})%
      </p>
      <p className="highscore">High Score: X</p>
    </>
  );
}

export default FinishScreen;
