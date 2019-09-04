import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Link } from "react-router-dom";

import Planner from './Planner';
import './App.css';

function Player() {
  return (
    <>
      <h2>Player</h2>
      <div>Under construction</div>
    </>
  );
}

function Stats() {
  return (
    <>
      <h2>Stats</h2>
      <div>Under construction</div>
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <p>TODO: rework this navbar</p>
        <nav>
          <ul>
            <li>
              <Link to="/planner">Planner</Link>
            </li>
            <li>
              <Link to="/player">Player</Link>
            </li>
            <li>
              <Link to="/stats">Stats</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact render={() => <Redirect to="/planner" />} />
        <Route path="/planner" component={Planner} />
        <Route path="/player" component={Player} />
        <Route path="/stats" component={Stats} />
        {/* TODO: set up 404 page not found component */}
      </div>
    </Router>
  );
}

export default App;
