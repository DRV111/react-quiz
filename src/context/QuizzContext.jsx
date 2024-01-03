import { createContext, useContext, useEffect, useReducer } from 'react';

const QuizzContext = createContext();

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

function QuizzProvider({ children }) {
  const [
    { questions, status, index, answer, points, highscore, timeRemain },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numOfQuestions = questions.length;
  const sumOfPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

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
    <QuizzContext.Provider
      value={{
        numOfQuestions,
        sumOfPoints,
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        timeRemain,
        dispatch,
      }}
    >
      {children}
    </QuizzContext.Provider>
  );
}

function useQuizz() {
  const context = useContext(QuizzContext);
  if (context === undefined) {
    throw new Error('useQuizz must be used within a QuizzProvider');
  }
  return context;
}

export { QuizzProvider, useQuizz };
