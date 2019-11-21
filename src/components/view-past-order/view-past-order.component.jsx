import React from 'react';

import OrderTotal from '../order-total/order-total.component';

const ViewPastOrder = ({ order }) => {
  let orderTotal = 0;
  const deliveryDate = new Date(order.delivery_date);

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Quantity</th>
            <th>Base</th>
            <th>Frosting</th>
            <th>Toppings</th>
            <th>Price</th>
          </tr>
        </tbody>
        {order.cupcakes.map((cupcake, index) => {
          const cost =
            cupcake.base.price +
            cupcake.frosting.price +
            cupcake.toppings.reduce((acc, curr) => acc + curr.price, 0);

          orderTotal += cost;
          return (
            <tbody key={index}>
              <tr>
                <td>1</td>
                <td>{cupcake.base.name.replace('Base', '')}</td>
                <td>{cupcake.frosting.name.replace('Frosting', '')}</td>
                <td>
                  {cupcake.toppings.map(topping => topping.name).join(',')}
                </td>
                <td>{`$${(cost / 100).toFixed(2)}`}</td>
              </tr>
            </tbody>
          );
        })}
      </table>
      <OrderTotal cupcakeTotal={orderTotal} />
      <h3>Delivery date: {deliveryDate.toLocaleString()}</h3>
    </div>
  );
};

export default ViewPastOrder;
