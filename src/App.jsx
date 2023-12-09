import { useEffect } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Error from './components/Error';
import Loader from './components/Loader';
import { useReducer } from 'react';
import StartScreen from './components/StartScreen';

const initialState = {
  questions: [],
  status: 'loading',
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
    default:
      throw new Error('Unknown action');
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const numOfQuestions = state.questions.length;
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
          <StartScreen numOfQuestions={numOfQuestions} />
        )}
      </Main>
    </div>
  );
}

export default App;
