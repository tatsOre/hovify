import React from 'react';
import './App.css';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from "@date-io/moment";
import {  Home, Motivation, About, Cvbuilder, Hello, SetAccount, Preview } from './components';
import { BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
  return (
    <MuiPickersUtilsProvider utils={ MomentUtils }>
      <Router>
        <Route exact path="/"           component={Home} />
        <Route exact path="/about"      component={About}  />
        <Route exact path="/builder"    component={Cvbuilder}  />
        <Route exact path="/Hello"      component={Hello}  />
        <Route exact path="/motivation" component={Motivation}  />
        <Route exact path="/account"    component={SetAccount}  />
        <Route exact path="/preview"    component={Preview}  />
      </Router>
    </MuiPickersUtilsProvider>
  );
}

export default App;
