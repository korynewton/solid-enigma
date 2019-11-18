import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/home/home.component';
import Order from './pages/order/order.component';
import Orders from './pages/orders/orders.component';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/order" component={Order} />
        <Route path="/orders" component={Orders} />
      </Switch>
    </div>
  );
}

export default App;
