import QuestionItem from './QuestionItem';

function Questions({ question, dispatch, answer }) {
  console.log(question);
  return (
    <div className="container">
      <h4>{question.question}</h4>
      <QuestionItem answer={answer} dispatch={dispatch} question={question} />
    </div>
  );
}
export default Questions;
