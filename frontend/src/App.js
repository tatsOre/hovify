import React from 'react';
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Home, Motivation, About, Cvbuilder, Hello, SetAccount, Preview, Dashboard } from './components';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';

export const context = React.createContext(null);

function App() {
  return (
    <context.Provider value={{token: "", user: {}}}> 
      <MuiPickersUtilsProvider utils={ MomentUtils }>
        <Router>
          <Route exact path="/"           component={Home} />
          <Route exact path="/Hello"      component={Hello} />
          <Route exact path="/about"      component={About} />
          <Route exact path="/motivation" component={Motivation} />
          <Route exact path="/account"    component={SetAccount} />
          <Route exact path="/builder"    component={Cvbuilder} />
          <Route exact path="/preview"    component={Preview} />
          <Route exact path="/dashboard"  component={Dashboard} />
        </Router>
      </MuiPickersUtilsProvider>
    </context.Provider>
  );
}

export default App;
