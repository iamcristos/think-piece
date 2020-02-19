import React from 'react';
import { render } from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';

import './index.scss';
import PostProvider from './provider/providerComponent';
import UserProvider from './provider/userProvider';

import Application from './components/Application';

render(
    <Router>
        <UserProvider>
            <PostProvider>
            <Application /> 
            </PostProvider>
        </UserProvider>
    </Router>, document.getElementById('root'));
