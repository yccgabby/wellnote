import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {EntryContextProvider} from './context';

ReactDOM.render(<EntryContextProvider><App/></EntryContextProvider>, document.getElementById('root'));