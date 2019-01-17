import React from 'react';
import {render} from 'react-dom';
import StorePicker from './components/StorePicker';
import App from './App';
import Router from './components/Router';
import style from './css/style.scss';

render(<Router/>, document.querySelector("#main"));
