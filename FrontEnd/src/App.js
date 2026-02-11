import React from 'react';
import { Provider } from 'react-redux';
import store from './Store/store';
import LogInteractionScreen from './Components/LoginteractionScreen';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <LogInteractionScreen />
      </div>
    </Provider>
  );
}

export default App;