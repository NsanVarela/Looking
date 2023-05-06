import React from 'react';
import { useRoutes } from 'react-router-dom';
import Home from './components/home/Home';
import Login from './components/login/Login';

const App = () => {
    const routes = useRoutes([
        { path: '/', element: <Login /> },
        { path: '/home', element: <Home /> },
    ])
    return routes;
};

export default App;
