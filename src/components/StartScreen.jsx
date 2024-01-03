import { useQuizz } from '../context/QuizzContext';

function StartScreen() {
  const { numOfQuestions, dispatch } = useQuizz();
  return (
    <div className="start">
      <h2>Welcome to the React-Quiz!!!</h2>
      <h3>{numOfQuestions} questions to test your react mastery!</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'startQuiz' })}
      >
        Lets Go!
      </button>
    </div>
  );
}

export default StartScreen;
