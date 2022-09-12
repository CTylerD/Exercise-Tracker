import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useState } from 'react';

import HomePage from './pages/HomePage.js'
import CreateExercisePage from './pages/CreateExercisePage.js'
import EditExercisePage from './pages/EditExercisePage.js'
import Navigation from './components/Navigation.js';

function App() {  
    const [exerciseToEdit, setExerciseToEdit] = useState();

    return (
        <div className="App">
            <Router>
            <header className="App-header">
                <h1>Track Yo Exercises!</h1>
                <p id="subtitle">Exercise Tracker App</p>
            </header>
            <Navigation />
            <main>
                <Route path='/' exact><HomePage setExerciseToEdit={setExerciseToEdit}/></Route>
                <Route path='/create'><CreateExercisePage/></Route>
                <Route path='/edit'><EditExercisePage exerciseToEdit={exerciseToEdit} /></Route>
            </main>
            <footer>
                <p id="footerText">All rights reserved &copy; 2022 Tyler Dennis</p>
            </footer>
        </Router>
        </div>
    );
  }
  
  export default App;
