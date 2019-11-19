import React from 'react';
import axios from 'axios';
import { generateId } from '../../utilities';

import './order.styles.scss';

import CupcakeCustomizer from '../../components/cupcake-cusomizer/cupcake-customizer.component';
import ReviewOrder from '../../components/review-order/review-order.component';

class Order extends React.Component {
  state = {
    bases: [],
    frostings: [],
    toppings: [],
    cupcakes: [],
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

    // generate ID for initial cupcake
    const id = generateId();

    this.setState({
      bases: basesRes.data.bases,
      frostings: frostingsRes.data.frostings,
      toppings: toppingsRes.data.toppings,
      cupcakes: [{ id }]
    });
  }

  addToOrder = customizedCupcake => {
    console.log(customizedCupcake);
    const newState = this.state.cupcakes.filter(
      item => item.id !== customizedCupcake.id
    );
    this.setState({ cupcakes: [...newState, customizedCupcake] });
  };

  addAnotherCupcake = () => {
    const id = generateId();
    this.setState(prevState => ({ cupcakes: [...prevState.cupcakes, { id }] }));
  };

  render() {
    const { bases, frostings, toppings, viewOrder, cupcakes } = this.state;
    const { addToOrder, addAnotherCupcake } = this;

    if (!viewOrder) {
      return (
        <div>
          <div className="cupcake-customizers">
            {cupcakes.map(item => {
              return (
                <CupcakeCustomizer
                  key={item.id}
                  id={item.id}
                  bases={bases}
                  frostings={frostings}
                  toppings={toppings}
                  addToOrder={addToOrder}
                />
              );
            })}
          </div>
          <button onClick={addAnotherCupcake}>Customize Another Cupcake</button>
        </div>
      );
    } else {
      return <ReviewOrder />;
    }
  }
}

export default Order;
