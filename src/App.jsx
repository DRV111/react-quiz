import { useEffect } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import { useReducer } from 'react';

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
        <p>1/15</p>
      </Main>
    </div>
  );
}

export default App;
