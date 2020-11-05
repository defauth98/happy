import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import LoginPage from './pages/AuthPages/Login';
import ValidadeEmail from './pages/AuthPages/ValidadeEmail';
import UpdatePassword from './pages/AuthPages/updatePassword';

import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/validate-email" component={ValidadeEmail} />
        <Route path="/update-password" component={UpdatePassword} />

        {/* <Route path="/" component={Landing} exact /> */}
        <Route path="/app" component={OrphanagesMap} />

        <Route path="/orphanages/create" component={CreateOrphanage} />
        <Route path="/orphanages/:id" component={Orphanage} />

        <Route path="/login" component={LoginPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
