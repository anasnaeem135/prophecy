import React from 'react';
import './App.css';

import Routing from 'routes/router';

import { MoralisProvider } from 'react-moralis';

const App = () => {
    return (
        <MoralisProvider initializeOnMount={false}>
            <Routing />
        </MoralisProvider>
    );
};

export default App;
