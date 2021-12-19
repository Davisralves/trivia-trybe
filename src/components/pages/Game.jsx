/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { requestTriviaApi } from '../../services/Api';
import './Game.css';
import Header from './Header';
import Timer from '../Timer';

const innitialState = [
  {
    category: 'question-category',
    type: '',
    difficulty: '',
    question: 'question-text',
    correct_answer: '',
    sortedAnswers: ['answer1', 'answer2'],
  },
];

// eslint-disable-next-line max-lines-per-function
export default function Game() {
  const [apiResponse, setApiResponse] = useState(innitialState);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [disableButton, setdisbleButtons] = useState(false);
  const [correctClick, setCorrectClick] = useState(false);
  const [timerId, setTimerID] = useState();
  const [resetTimer, setResetTimer] = useState(false);
  const [pauseTimer, setPauseTimer] = useState(false);
  const [loading, setLoading] = useState(false);

  const maxQuestionsNumber = 4;
  const history = useHistory();

  const setTimer30seg = () => {
    clearTimeout(timerId);
    const timeOut = 30000;
    const id = setTimeout(
      () => setdisbleButtons(true), timeOut,
    );
    setTimerID(id);
  };

  const sortArray = ({
    correct_answer,
    incorrect_answers }) => {
    const fiftyPercent = 0.5;
    const array = [correct_answer, ...incorrect_answers];
    return array.sort(() => Math.random() - fiftyPercent);
  };

  const sortAnswers = (results) => (
    results.map((object) => (
      { ...object, sortedAnswers: sortArray(object) }))
  );

  const fetchApi = async () => {
    setLoading(true);
    const { results } = await requestTriviaApi();
    setApiResponse(sortAnswers(results));
    setLoading(false);
    setTimer30seg();
  };

  const decodeUtf8 = (string) => {
    // função inspirada em por função de Lucas Rodrigues Turma 08
    const stringUTF = decodeURI(string);
    const convertDoubleQuotes = stringUTF.replace(/&quot;/g, '"');
    const convertQuotes = convertDoubleQuotes.replace(/&#039;/g, '\'');
    const convertAccent = convertQuotes.replace(/&eacute/g, 'é');
    return convertAccent;
  };

  const handleAnswerClick = (className) => {
    setdisbleButtons(true);
    setPauseTimer(true);
    if (className === 'correct') {
      setCorrectClick(true);
    }
  };

  const renderButton = (className, answer, key) => (
    <button
      type="button"
      className={ className }
      key={ key }
      disabled={ disableButton }
      onClick={ () => handleAnswerClick(className) }
    >
      {decodeUtf8(answer)}
    </button>);

  const printAnwsers = (sortedAnswers, correct_answer) => (
    sortedAnswers.map((answer, index) => {
      if (answer === correct_answer) {
        return renderButton('correct', answer, index);
      } return renderButton('wrong', answer, index);
    })
  );

  const handleNextQuestion = () => {
    if (questionIndex < maxQuestionsNumber) {
      setQuestionIndex(questionIndex + 1);
      setdisbleButtons(false);
    }
    setResetTimer(true);
    setTimer30seg();
    setPauseTimer(false);
  };

  const nextOrGoToFeedbackButton = () => {
    const nextButton = (
      <button
        type="button"
        onClick={ handleNextQuestion }
      >
        Next
      </button>);
    const goToFeedBackButton = (
      <button
        type="button"
        onClick={ () => history.push('/feedback') }
      >
        Go to Feedback
      </button>);
    const none = <span />;
    if (disableButton && questionIndex < maxQuestionsNumber) {
      return nextButton;
    }
    if (disableButton && questionIndex === maxQuestionsNumber) {
      return goToFeedBackButton;
    } return none;
  };

  useEffect(() => { fetchApi(); }, []);
  useEffect(() => (setResetTimer(false)), [resetTimer]);
  const {
    category,
    question,
    correct_answer,
    sortedAnswers,
    difficulty,
  } = apiResponse[questionIndex];
  return (
    <main className="App paper container-lg">
      <Header />
      {loading ? <h1>Loading...</h1>
        : (
          <section>
            <Timer
              difficulty={ parseInt(difficulty, 10) }
              clicked={ disableButton }
              correctClick={ correctClick }
              setCorrectClick={ setCorrectClick }
              resetTimer={ resetTimer }
              setResetTimer={ setResetTimer }
              pauseTimer={ pauseTimer }
              setPauseTimer={ setPauseTimer }
            />
            <div id="buttonId">
              <h6 data-testid="question-category">{category}</h6>
              <p data-testid="question-text">{decodeUtf8(question)}</p>
            </div>
            <div>
              { printAnwsers(sortedAnswers, correct_answer) }
            </div>
            { nextOrGoToFeedbackButton() }
          </section>
        )}
    </main>
  );
}
