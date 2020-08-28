import React from 'react';
import classes from './App.module.css';
import Main from './container/Main/Main'

function App() {
  return (
    <div className={classes.App}>
      <div className={classes.Head}>
        <h1>INDIA COVID-19 Tracker</h1>
        <p>Let's pray to make our Earth Covid-19 free soon. Stay Safe , Stay Home</p>
        <span>Hover over a state row or map for more details</span>
      </div>

      <Main />
    </div>
  );
}

export default App;
