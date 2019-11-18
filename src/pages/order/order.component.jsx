import React from 'react';
import axios from 'axios';

import CupcakeCustomizer from '../../components/cupcake-cusomizer/cupcake-customizer.component';
import AddCupcake from '../../components/add-cupcake/add-cupcake.component';
import ReviewOrder from '../../components/review-order/review-order.component';

class Order extends React.Component {
  state = {
    bases: [],
    frostings: [],
    toppings: [],
    order: [],
    viewOrder: false
  };

  async componentDidMount() {
    // Retrieve cupcake base, frosting and topping options, set state
    const baseURL = 'http://localhost:4000/cupcakes';
    const [basesRes, frostingsRes, toppingsRes] = await Promise.all([
      axios.get(`${baseURL}/bases`),
      axios.get(`${baseURL}/frostings`),
      axios.get(`${baseURL}/toppings`)
    ]);

    this.setState({
      bases: basesRes.data.bases,
      frostings: frostingsRes.data.frostings,
      toppings: toppingsRes.data.toppings
    });
  }

  render() {
    const { bases, frostings, toppings, viewOrder } = this.state;

    return !viewOrder ? (
      <div>
        <CupcakeCustomizer
          bases={bases}
          frostings={frostings}
          toppings={toppings}
        />
        <AddCupcake />
      </div>
    ) : (
      <ReviewOrder />
    );
  }
}

export default Order;
