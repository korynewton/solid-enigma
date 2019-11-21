import React, { useState } from 'react';

import './review-order.styles.scss';

import SingleCupcakeDetails from '../single-cupcake-details/single-cupcake-details.component';
import OrderTotal from '../order-total/order-total.component';
import DateTimeSelector from '../date-time-selctor/date-time-selector.component';

const ReviewOrder = ({ uniqueCupcakes, submitOrder }) => {
  // initialize date for 24 hours from now
  const [date, setDate] = useState(
    new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
  );

  const cupcakeTotal = uniqueCupcakes.reduce(
    (acc, curr) => acc + curr.total * curr.quantity,
    0
  );

  return (
    <div className="container">
      <h2>Order Review:</h2>
      <table>
        <tbody>
          <tr>
            <th>Quantity</th>
            <th>Base</th>
            <th>Frosting</th>
            <th>Toppings</th>
            <th>Unit Price</th>
            <th>Total:</th>
          </tr>
        </tbody>

        {uniqueCupcakes.map(cupcake => {
          return <SingleCupcakeDetails key={cupcake.id} cupcake={cupcake} />;
        })}
      </table>

      <OrderTotal cupcakeTotal={cupcakeTotal} />
      <DateTimeSelector setDate={setDate} date={date} />

      <div className="submit-button">
        <button onClick={() => submitOrder(date)}>Submit Order</button>
      </div>
    </div>
  );
};

export default ReviewOrder;
