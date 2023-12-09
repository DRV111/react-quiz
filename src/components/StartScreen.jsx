function StartScreen({ numOfQuestions }) {
  return (
    <div className="start">
      <h2>Welcome to the React-Quiz!!!</h2>
      <h3>{numOfQuestions} questions to test your react mastery!</h3>
      <button className="btn btn-ui">Lets Go!</button>
    </div>
  );
}

export default StartScreen;
