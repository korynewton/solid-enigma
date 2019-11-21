import React from 'react';

import './order-total.styles.scss';

const OrderTotal = ({ cupcakeTotal }) => {
  const subTotal = cupcakeTotal + 150;
  const salesTax = subTotal * 0.0875;
  const grandTotal = subTotal + salesTax;
  return (
    <div className="total">
      <table>
        <tbody>
          <tr>
            <th>Subtotal:</th>
            <td>${(cupcakeTotal / 100).toFixed(2)}</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <th>Delivery:</th>
            <td>$1.50</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <th>Tax (8.75%):</th>
            <td>${(salesTax / 100).toFixed(2)}</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <th>Total:</th>
            <td>${(grandTotal / 100).toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderTotal;
