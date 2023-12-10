function NextButton({ dispatch, answer, indx, numOfQuestions }) {
  if (answer === null) {
    return null;
  }
  if (indx < numOfQuestions - 1) {
    return (
      <button
        onClick={() => dispatch({ type: 'nextQuestion' })}
        className="btn btn-ui"
      >
        Next
      </button>
    );
  }
  if (indx === numOfQuestions - 1) {
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
