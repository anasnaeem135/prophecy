import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';

import Routing from 'routes/router';

const loginRoute = createBrowserRouter([
    {
        path: '/',
        element: <Login />,
    },
]);

const signupRoute = createBrowserRouter([
    {
        path: '/Signup',
        element: <Signup />,
    },
]);

const App = () => {
    return (
        // <Router>
        <div className="App">
            <Routing />
            {/* <RouterProvider router={loginRoute} /> */}
            {/* <RouterProvider router={signupRoute} /> */}
            {/* <Signup /> */}
        </div>
        // </Router>
    );
};

export default App;
