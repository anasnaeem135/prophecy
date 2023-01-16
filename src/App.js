import React from 'react';
import './App.css';

import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';

const App = () => {
    return (
        <div className="App">
            {/* <Login /> */}
            <Signup />
        </div>
    );
};

export default App;
