import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import {Routes, Route} from 'react-router-dom';
import Homepage from './Homepage';


function App() {
  return (
    <div className="App">
      <h1>PROJECT 3 TEST </h1>

      <Routes>
        <Route path ='/' element = {<Homepage />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>

      {/* {Nav_Menu}
      {Homepage} */}

      {/* Test 2 for frontend branch */}
    </div>
  );
}

export default App;
