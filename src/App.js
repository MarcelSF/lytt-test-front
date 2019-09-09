import React, { Component } from 'react';

// import './App.css'; <-- commented out for styling
import SessionsList from './components/SessionsList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SessionsList />
      </div>
    );
  }
}

export default App;
