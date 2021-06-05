import React from 'react';

import NavBar from './NavBar';
import Home from './Home';
import ListPet from './ListPet';
import Community from './Community';
import Footer from './Footer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import history from './history';
import SearchResult from './SearchResult'
import PetDetail from './PetDetail';

function App() {
  return (
    <Router history={history}>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/community" component={Community} />
        <Route path="/filter" component={SearchResult} />
        <Route path="/allpets/" component={PetDetail} />
        <Route path="/listpet" component={ListPet} />
        <Route path="/search" exact component={SearchResult} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
