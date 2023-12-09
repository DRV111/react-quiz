import QuestionItem from './QuestionItem';

function Questions({ question }) {
  console.log(question);
  return (
    <div className="container">
      <h4>{question.question}</h4>
      <QuestionItem question={question} />
    </div>
  );
}
export default Questions;
