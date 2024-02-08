import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import User from './pages/User';
import List from './pages/List';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/addemploye" element={<User/>}/>
          <Route exact path="/" element={<List/>}/>
          <Route exact path="/addemploye/:id" element={<User/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
