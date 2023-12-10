import { useEffect } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Error from './components/Error';
import Loader from './components/Loader';
import { useReducer } from 'react';
import StartScreen from './components/StartScreen';
import Questions from './components/Questions';
import NextButton from './components/NextButton';
import ProgressBar from './components/ProgressBar';
import FinishScreen from './components/FinishScreen';
import Footer from './components/Footer';
import Timer from './components/Timer';

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  timeRemain: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'dataRecieved':
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
      };
    case 'dataFailed':
      return {
        ...state,
        status: 'error',
      };
    case 'startQuiz':
      return {
        ...state,
        status: 'active',
        timeRemain: state.questions.length * SECS_PER_QUESTION,
      };
    case 'newAnswer': {
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }
    case 'nextQuestion':
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case 'finishQuiz':
      return {
        ...state,
        status: 'finished',
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case 'restart':
      return {
        ...state,
        status: 'ready',
        index: 0,
        answer: null,
        points: 0,
        questions: state.questions,
        timeRemain: 20,
      };
    case 'tick':
      return {
        ...state,
        timeRemain: state.timeRemain - 1,
        status: state.timeRemain === 0 ? 'finished' : state.status,
      };
    default:
      throw new Error('Unknown action');
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const numOfQuestions = state.questions.length;
  const sumOfPoints = state.questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(function () {
    async function getQuestions() {
      try {
        const response = await fetch('http://localhost:8000/questions');
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }
        const data = await response.json();
        dispatch({ type: 'dataRecieved', payload: data });
      } catch (err) {
        dispatch({ type: 'dataFailed' });
      }
    }
    getQuestions();
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {state.status === 'loading' && <Loader />}
        {state.status === 'error' && <Error />}
        {state.status === 'ready' && (
          <StartScreen numOfQuestions={numOfQuestions} dispatch={dispatch} />
        )}
        {state.status === 'active' && (
          <>
            <ProgressBar
              points={state.points}
              numOfQuestions={numOfQuestions}
              indx={state.index}
              sumOfPoints={sumOfPoints}
              answer={state.answer}
            />
            <Footer>
              <Questions
                question={state.questions[state.index]}
                dispatch={dispatch}
                answer={state.answer}
              />
              <Timer time={state.timeRemain} dispatch={dispatch} />
              <NextButton
                dispatch={dispatch}
                answer={state.answer}
                numOfQuestions={numOfQuestions}
                indx={state.index}
              />
            </Footer>
          </>
        )}
        {state.status === 'finished' && (
          <FinishScreen
            dispatch={dispatch}
            points={state.points}
            sumOfPoints={sumOfPoints}
            highscore={state.highscore}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
