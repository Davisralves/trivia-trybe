import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { requestTriviaApi } from '../../services/Api';
import './Game.css';
import Timer from '../Timer';
import Header from './Header';

export default class Game extends Component {
  constructor() {
    super();
    this.state = {
      disable: false,
      questions: {
        results: [
          {
            category: 'question-category',
            type: '',
            difficulty: '',
            question: 'question-text',
            correct_answer: '',
            incorrect_answers: [],
          },
        ],
      },
      index: 0,
      correctClick: false,
      answer: '',
      clicked: false,
      resetTimer: false,
      loading: true,
    };
    this.setQuestionState = this.setQuestionState.bind(this);
    this.sortArray = this.sortArray.bind(this);
    this.printQuestions = this.printQuestions.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.changeBorderColor = this.changeBorderColor.bind(this);
    this.setClickedFalse = this.setClickedFalse.bind(this);
    this.handleNextQuestion = this.handleNextQuestion.bind(this);
    this.nextButton = this.nextButton.bind(this);
    this.setTimer30seg = this.setTimer30seg.bind(this);
    this.changeResetTimer = this.changeResetTimer.bind(this);
  }

  async componentDidMount() {
    const questions = await requestTriviaApi();
    this.setQuestionState(questions);
    this.setTimer30seg();
  }

  setClickedFalse() { this.setState({ correctClick: false }); }

  setQuestionState(questions) { return this.setState({ questions, loading: false }); }

  setTimer30seg() {
    const timeOut = 30000;
    clearTimeout();
    setTimeout(() => this.setState({ disable: true, clicked: true }), timeOut);
  }

  handleNextQuestion() {
    const { history } = this.props;
    const { index } = this.state;
    const maxLimit = 3;
    this.setTimer30seg();
    if (index <= maxLimit) {
      this.setState((prevState) => ({
        index: prevState.index + 1,
        disable: false,
        clicked: false,
        resetTimer: true,
      }));
    } else {
      history.push('/feedback');
    }
  }

  changeResetTimer() {
    this.setState({
      resetTimer: false,
    });
  }

  nextButton() {
    return (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ this.handleNextQuestion }
      >
        Próxima
      </button>
    );
  }

  printQuestions(correctAnswer, incorrectAnswers, type, disable) {
    const { renderButton, sortArray } = this;
    if (type === 'multiple') {
      const array = [...incorrectAnswers, correctAnswer];
      const WrongAnswers = 3;

      const arrayWithDataTest = array.map((anwser, index) => {
        const dataTest = index < WrongAnswers
          ? `wrong-answer-${index}` : 'correct-answer';
        return (renderButton(dataTest, index, anwser, disable));
      });

      return sortArray(arrayWithDataTest);
    }

    const array = [incorrectAnswers, correctAnswer];
    const arrayWithDataTest = array.map((anwser, index) => {
      if (index === 0) {
        return (renderButton(`wrong-answer-${index}`, index, anwser, disable));
      }
      return (renderButton('correct-answer', index, anwser, disable));
    });
    return sortArray(arrayWithDataTest);
  }

  changeBorderColor({ target }) {
    this.setState({
      disable: true,
      correctClick: true,
      clicked: true,
      answer: target.className,
    });
  }

  sortArray(array) {
    const fiftyPercent = 0.5;
    return array.sort(() => Math.random() - fiftyPercent);
  }

  renderButton(dataTest, index, anwser, disable) {
    const sliceNumber1 = 0;
    const sliceNumbe2 = 5;
    return (
      <button
        type="button"
        data-testid={ dataTest }
        key={ index }
        className={ dataTest.slice(sliceNumber1, sliceNumbe2) }
        disabled={ disable }
        onClick={ this.changeBorderColor }
      >
        {anwser}
      </button>);
  }

  render() {
    const {
      questions: { results },
      index,
      disable,
      correctClick,
      answer,
      clicked,
      resetTimer,
      loading } = this.state;
    const {
      category,
      type,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
      difficulty } = results[index];
    if (loading) return <span>Loading</span>;
    return (
      <main>
        <Header />
        <Timer
          difficulty={ difficulty }
          correctClick={ correctClick }
          setClickedFalse={ this.setClickedFalse }
          answer={ answer }
          resetTimer={ resetTimer }
          changeResetTimer={ this.changeResetTimer }
        />
        <div id="buttonId">
          <h6 data-testid="question-category">{category}</h6>
          <p data-testid="question-text">{question}</p>
        </div>
        <div>
          {this.printQuestions(correctAnswer, incorrectAnswers, type, disable)}
          { clicked ? this.nextButton() : <span /> }
        </div>
      </main>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    resetTimer: PropTypes.bool.isRequired,
    push: PropTypes.func,
  }).isRequired,
};
