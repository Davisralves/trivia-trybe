import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
// import logo from './trivia.png';
import './App.css';
import Login from './components/pages/Login';
import Settings from './components/pages/Settings';
import Game from './components/pages/Game';
import Feedback from './components/pages/Feedback';
// import Header from './components/pages/Header';

class App extends Component {
  render() {
    return (
      <main className="App paper container-lg">
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/settings" component={ Settings } />
          <Route path="/game" component={ Game } />
          <Route path="/feedback" component={ Feedback } />
        </Switch>
      </main>
    );
  }
}

export default App;
