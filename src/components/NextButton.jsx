import { useQuizz } from '../context/QuizzContext';

function NextButton() {
  const { numOfQuestions, index, answer, dispatch } = useQuizz();
  if (answer === null) {
    return null;
  }
  if (index < numOfQuestions - 1) {
    return (
      <button
        onClick={() => dispatch({ type: 'nextQuestion' })}
        className="btn btn-ui"
      >
        Next
      </button>
    );
  }
  if (index === numOfQuestions - 1) {
    return (
      <button
        onClick={() => dispatch({ type: 'finishQuiz' })}
        className="btn btn-ui"
      >
        Finish
      </button>
    );
  }
}

export default NextButton;
