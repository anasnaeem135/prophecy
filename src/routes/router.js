import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import RootStack from './rootStack';

const Routing = () => {
    return (
        <BrowserRouter>
            <RootStack />
        </BrowserRouter>
    );
};

export default Routing;
