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
    uniqueCupcakes: [],
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

    // generate ID for initial cupcake
    const id = generateId();

    this.setState({
      bases: basesRes.data.bases,
      frostings: frostingsRes.data.frostings,
      toppings: toppingsRes.data.toppings,
      uniqueCupcakes: [{ id }]
    });
  }

  addToOrder = customizedCupcake => {
    const { uniqueCupcakes } = this.state;
    const { toppings, frosting, base, id, quantity } = customizedCupcake;

    const newUniqueCupcakes = uniqueCupcakes.filter(
      cupcakes => cupcakes.id !== id
    );

    let duplicateObj = {
      base,
      frosting,
      toppings
    };

    let duplicate = [];

    while (duplicate.length < quantity) {
      duplicate.push(duplicateObj);
    }

    this.setState(prevState => ({
      uniqueCupcakes: [...newUniqueCupcakes, customizedCupcake],
      order: [...prevState.order, ...duplicate]
    }));
  };

  addAnotherCupcake = () => {
    const id = generateId();

    this.setState(prevState => ({
      uniqueCupcakes: [...prevState.uniqueCupcakes, { id }]
    }));
  };

  toggleReviewOrder = () => {
    this.setState(prevState => ({ viewOrder: !prevState.viewOrder }));
  };

  submitOrder = async selectedDate => {
    const { history } = this.props;
    const baseURL = 'http://localhost:4000/cupcakes';

    const orderObj = {
      order: { cupcakes: [...this.state.order], delivery_date: selectedDate }
    };

    const res = await axios.post(`${baseURL}/orders`, orderObj);
    if (res.status === 200) {
      history.push('/thankyou');
    }
  };

  render() {
    const {
      bases,
      frostings,
      toppings,
      viewOrder,
      uniqueCupcakes
    } = this.state;
    const {
      addToOrder,
      addAnotherCupcake,
      toggleReviewOrder,
      submitOrder
    } = this;

    if (!viewOrder) {
      return (
        <div>
          <div className="cupcake-customizers">
            {uniqueCupcakes.map(item => {
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
          <div className="button-div">
            <button onClick={addAnotherCupcake}>
              Customize Another Cupcake
            </button>
            <button onClick={toggleReviewOrder}>Review Order</button>
          </div>
        </div>
      );
    } else {
      return (
        <ReviewOrder
          uniqueCupcakes={uniqueCupcakes}
          submitOrder={submitOrder}
        />
      );
    }
  }
}

export default Order;
