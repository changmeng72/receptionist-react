import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home/App';
import About from './pages/About/App';
import Settings from './pages/Settings/App';
import SearchEmployee from './pages/SearchEmployee'
import QRScanner from './pages/QRScanner';
import AgreementSign from './pages/AgreementSign'
import CollectClientInfo from './pages/CollectClientInfo'
import PrintBadge from './pages/PrintBadge'
import Delivery from './pages/Delivery'
//import NoPage from './pages/NoPage/NoPage';
const Routes = () => (
<BrowserRouter>
   <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/settings" component={Settings} />
      <Route exact path="/searchemployee" component={SearchEmployee} />
      <Route exact path="/qrscan" component={QRScanner} />
      <Route exact path="/agreement" component={AgreementSign} />
      <Route exact path="/collectclientinfo" component={CollectClientInfo} />
      <Route exact path="/printbadge" component={PrintBadge} />  
      <Route exact path="/delivery" component={Delivery} />    
</Switch>
</BrowserRouter>
);
export default Routes;