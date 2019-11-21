import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/home/home.component';
import Order from './pages/order/order.component';
import Orders from './pages/orders/orders.component';
import ThankYou from './pages/thank-you/thank-you.component';

import './App.styles.scss';

function App() {
  return (
    <div>
      <h1 className="header">Tinycakes</h1>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/order" component={Order} />
        <Route path="/orders" component={Orders} />
        <Route path="/thankyou" component={ThankYou} />
      </Switch>
    </div>
  );
}

export default App;
