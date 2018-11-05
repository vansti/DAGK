import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './components/Login';
import Home from './components/Home';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/:id' component={Home} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
