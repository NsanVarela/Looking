import React from 'react';
import { useRoutes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';

const App = () => {
    const routes = useRoutes([
        { path: '/', element: <Login /> },
        { path: '/home', element: <Home /> },
    ])
    return routes;
};

export default App;
