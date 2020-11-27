import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import LoginPage from './pages/AuthPages/Login';
import ValidadeEmail from './pages/AuthPages/ValidadeEmail';
import UpdatePassword from './pages/AuthPages/updatePassword';

import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';
import Dashboard from './pages/Dashboard';
import EditPage from './pages/EditOrphanage';
import PendingOrphanages from './pages/PendingOrphanages';
import ShowPendingOrphanage from './pages/ShowPendingOrphanage';
import CreateSucessPage from './pages/CreateSucess';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/validate-email" component={ValidadeEmail} />
        <Route path="/update-password" component={UpdatePassword} />

        <Route path="/landing" component={Landing} exact />
        <Route path="/app" component={OrphanagesMap} />

        <Route path="/orphanages/create" component={CreateOrphanage} />
        <Route path="/orphanages/:id" component={Orphanage} />
        <Route path="/success" component={CreateSucessPage} />

        <Route path="/login" component={LoginPage} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/pending" exact component={PendingOrphanages} />
        <Route path="/edit/:id" component={EditPage} />
        <Route path="/pending/:id" component={ShowPendingOrphanage} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
