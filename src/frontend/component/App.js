import React from 'react';

import NavBar from './NavBar';
import SearchBox from './SearchBox';
import ListPet from './ListPet';
import Community from './Community';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/" exact component={SearchBox} />
        <Route path="/community" component={Community} />
        <Route path="/listpet" component={ListPet} />
      </Switch>
    </Router>
  );
}

export default App;
