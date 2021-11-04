import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import './App.css';
import Login from './components/pages/Login';
import Settings from './components/pages/Settings';
import Game from './components/pages/Game';
import Feedback from './components/pages/Feedback';
import Ranking from './components/pages/Ranking';

class App extends Component {
  render() {
    return (
      <main className="App paper container-lg">
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/settings" component={ Settings } />
          <Route path="/game" component={ Game } />
          <Route path="/feedback" component={ Feedback } />
          <Route path="/ranking" component={ Ranking } />
        </Switch>
      </main>
    );
  }
}

export default App;
