import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AuthStack from './authStack';
import RootStack from './rootStack';

const Routing = () => {
    return (
        <BrowserRouter>
            <AuthStack />
            <RootStack />
        </BrowserRouter>
    );
};

export default Routing;
