import React from 'react';

import './cupcake-customizer.styles.scss';

class CupcakeCustomizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBase: {},
      selectedFrosting: {},
      selectedToppings: [],
      quantity: 1,
      total: 0,
      addedToOrder: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { bases, frostings, toppings } = this.props;
    const { selectedBase, selectedFrosting, selectedToppings } = this.state;

    const baseTotal = bases.reduce((acc, curr) => {
      if (curr.key === selectedBase.key) return (acc += curr.price);
      return acc;
    }, 0);

    const frostingTotal = frostings.reduce((acc, curr) => {
      if (curr.key === selectedFrosting.key) return (acc += curr.price);
      return acc;
    }, 0);

    const toppingTotal = toppings.reduce((acc, curr) => {
      if (selectedToppings.includes(curr)) return (acc += curr.price);
      return acc;
    }, 0);

    const newTotal = baseTotal + frostingTotal + toppingTotal;

    if (prevState.total !== newTotal) this.setState({ total: newTotal });
  }

  handleOnClick = (e, base) => {
    const { name } = e.target;
    this.setState({ [name]: base });
  };

  handleUpdateQuantity = e => {
    const { name, value } = e.target;
    this.setState({ [name]: Number(value) });
  };

  handleAddToppings = topping => {
    const { selectedToppings } = this.state;
    if (selectedToppings.includes(topping)) {
      const newToppings = selectedToppings.filter(item => item !== topping);
      this.setState({ selectedToppings: newToppings });
    } else {
      this.setState(prevState => ({
        selectedToppings: [...prevState.selectedToppings, topping]
      }));
    }
  };

  addCupcakeToOrder = () => {
    const { id, addToOrder } = this.props;
    const {
      selectedBase,
      selectedFrosting,
      selectedToppings,
      quantity,
      total
    } = this.state;

    addToOrder({
      id,
      base: selectedBase,
      frosting: selectedFrosting,
      toppings: selectedToppings,
      quantity,
      total
    });

    this.setState({ addedToOrder: true });
  };

  render() {
    const { bases, frostings, toppings } = this.props;
    const {
      selectedBase,
      selectedFrosting,
      selectedToppings,
      quantity,
      total,
      addedToOrder
    } = this.state;
    const { handleOnClick, handleAddToppings, addCupcakeToOrder } = this;

    return (
      <div className="cupcake-customizer">
        <div className="bases">
          <h2>Choose a Base:</h2>
          {bases.map(base => {
            const { key, name, price } = base;
            return (
              <button
                key={key}
                base={base}
                name="selectedBase"
                onClick={e => handleOnClick(e, base)}
                className={selectedBase.key === key ? 'selected' : ''}
              >
                {`${name.replace(' Base', '')} $${(price / 100).toFixed(2)}`}
              </button>
            );
          })}
        </div>

        <div className="frostings">
          <h2>Choose a Frosting:</h2>

          {frostings.map(frosting => {
            const { key, name, price } = frosting;
            return (
              <button
                key={key}
                name="selectedFrosting"
                onClick={e => handleOnClick(e, frosting)}
                className={selectedFrosting.key === key ? 'selected' : ''}
              >
                {`${name.replace(' Frosting', '')} $${(price / 100).toFixed(
                  2
                )}`}
              </button>
            );
          })}
        </div>

        <div className="toppings">
          <h2>Choose Toppings:</h2>

          {toppings.map(topping => {
            const { key, name, price } = topping;
            return (
              <button
                key={key}
                name="selectedToppings"
                onClick={() => handleAddToppings(topping)}
                className={selectedToppings.includes(topping) ? 'selected' : ''}
              >
                {`${name} $${(price / 100).toFixed(2)}`}
              </button>
            );
          })}
        </div>

        <div className="details">
          <form>
            <label>
              Quantity:
              <input
                onChange={e => this.handleUpdateQuantity(e)}
                type="number"
                name="quantity"
                defaultValue="1"
              ></input>
            </label>
          </form>
        </div>

        <div className="add-to-order">
          <h2>Total: ${((total * quantity) / 100).toFixed(2)}</h2>
          {!addedToOrder ? (
            <button onClick={addCupcakeToOrder}>Add To Order</button>
          ) : (
            <h2>Added!</h2>
          )}
        </div>
      </div>
    );
  }
}

export default CupcakeCustomizer;
