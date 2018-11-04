import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './page/Login';
import Home from './page/Home';


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
