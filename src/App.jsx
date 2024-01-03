// import { useEffect } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Error from './components/Error';
import Loader from './components/Loader';
// import { useReducer } from 'react';
import StartScreen from './components/StartScreen';
import Questions from './components/Questions';
import NextButton from './components/NextButton';
import ProgressBar from './components/ProgressBar';
import FinishScreen from './components/FinishScreen';
import Footer from './components/Footer';
import Timer from './components/Timer';
import { useQuizz } from './context/QuizzContext';

function App() {
  const {
    numOfQuestions,
    status,
    questions,
    index,
    points,
    dispatch,
    sumOfPoints,
    highscore,
    timeRemain,
    answer,
  } = useQuizz();
  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <StartScreen numOfQuestions={numOfQuestions} dispatch={dispatch} />
        )}
        {status === 'active' && (
          <>
            <ProgressBar
              points={points}
              numOfQuestions={numOfQuestions}
              indx={index}
              sumOfPoints={sumOfPoints}
              answer={answer}
            />
            <Footer>
              <Questions
                question={questions[index]}
                dispatch={dispatch}
                answer={answer}
              />
              <Timer time={timeRemain} dispatch={dispatch} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                numOfQuestions={numOfQuestions}
                indx={index}
              />
            </Footer>
          </>
        )}
        {status === 'finished' && (
          <FinishScreen
            dispatch={dispatch}
            points={points}
            sumOfPoints={sumOfPoints}
            highscore={highscore}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
