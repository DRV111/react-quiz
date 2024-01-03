import { useQuizz } from '../context/QuizzContext';

function ProgressBar() {
  const { index, numOfQuestions, points, sumOfPoints, answer } = useQuizz();
  return (
    <header className="progress">
      <progress value={index + Number(answer !== null)} max={numOfQuestions} />
      <p>
        Question: <strong>{index + 1}</strong> / {numOfQuestions}
      </p>
      <p>
        Points: <strong>{points}</strong> / {sumOfPoints}
      </p>
    </header>
  );
}

export default ProgressBar;
