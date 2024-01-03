import { useQuizz } from '../context/QuizzContext';
import QuestionItem from './QuestionItem';

function Questions() {
  const { questions, index } = useQuizz();
  const question = questions.at(index);
  return (
    <div className="container">
      <h4>{question.question}</h4>
      <QuestionItem question={question} />
    </div>
  );
}
export default Questions;
