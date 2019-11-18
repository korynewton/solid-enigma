import React from 'react';

import CupcakeCustomizer from '../../components/cupcake-cusomizer/cupcake-customizer.component';
import AddCupcake from '../../components/add-cupcake/add-cupcake.component';
import ReviewOrder from '../../components/review-order/review-order.component';

class Order extends React.Component {
  state = {
    bases: [],
    frosting: [],
    toppings: [],
    order: {},
    viewOrder: false
  };

  render() {
    const { viewOrder } = this.state;

    return !viewOrder ? (
      <div>
        <CupcakeCustomizer />
        <AddCupcake />
      </div>
    ) : (
      <ReviewOrder />
    );
  }
}

export default Order;
