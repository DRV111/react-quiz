import QuestionItem from './QuestionItem';

function Questions({ question, dispatch, answer }) {
  return (
    <div className="container">
      <h4>{question.question}</h4>
      <QuestionItem answer={answer} dispatch={dispatch} question={question} />
    </div>
  );
}
export default Questions;
