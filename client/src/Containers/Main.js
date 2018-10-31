import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Article from './Article';

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/article/:id" component={Article} />
    </Switch>
  </main>
);

export default Main;
