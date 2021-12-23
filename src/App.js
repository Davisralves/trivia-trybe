import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import './App.css';
import Login from './components/pages/Login';
import Settings from './components/pages/Settings';
import Game from './components/pages/Game';
import Ranking from './components/pages/Ranking';
import Feedback from './components/pages/Feedback';

class App extends Component {
  render() {
    return (
      <section>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/settings" component={ Settings } />
          <Route path="/game" component={ Game } />
          <Route path="/feedback" component={ Feedback } />
          <Route path="/ranking" component={ Ranking } />
        </Switch>
      </section>
    );
  }
}

export default App;
