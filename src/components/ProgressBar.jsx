function ProgressBar({ indx, numOfQuestions, points, sumOfPoints, answer }) {
  return (
    <header className="progress">
      <progress value={indx + Number(answer !== null)} max={numOfQuestions} />
      <p>
        Question: <strong>{indx + 1}</strong> / {numOfQuestions}
      </p>
      <p>
        Points: <strong>{points}</strong> / {sumOfPoints}
      </p>
    </header>
  );
}

export default ProgressBar;
