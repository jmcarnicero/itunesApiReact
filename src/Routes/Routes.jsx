import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from '../App';
import TrackDetail from '../components/TrackDetail/TrackDetail';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={App} />
    <Route exact path="/detail/:id" component={TrackDetail} />
  </Switch>
);

export default Routes;
