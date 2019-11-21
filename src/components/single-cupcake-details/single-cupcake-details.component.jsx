import React from 'react';

const SingleCupcakeDetails = ({ cupcake }) => {
  const { base, frosting, toppings, quantity, total } = cupcake;
  return (
    <tbody>
      <tr>
        <td>{quantity}</td>
        <td>{base.name.replace('Base', '')}</td>
        <td>{frosting.name.replace('Frosting', '')}</td>
        <td>{toppings.map(topping => topping.name).join(', ')}</td>
        <td>${(total / 100).toFixed(2)}</td>
        <td>${((total * quantity) / 100).toFixed(2)}</td>
      </tr>
    </tbody>
  );
};

export default SingleCupcakeDetails;
