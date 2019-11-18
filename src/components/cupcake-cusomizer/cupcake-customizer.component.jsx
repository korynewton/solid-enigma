import React from 'react';

import './cupcake-customizer.styles.scss';

class CupcakeCustomizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBase: '',
      selectedFrosting: '',
      selectedToppings: [],
      quantity: 0
    };
  }
  handleOnClick = (e, key) => {
    const { name } = e.target;
    this.setState({ [name]: key });
  };

  handleUpdateQuantity = e => {
    const { name, value } = e.target;
    this.setState({ [name]: Number(value) });
  };

  handleAddToppings = (e, key) => {
    const { selectedToppings } = this.state;
    const { name } = e.target;
    if (selectedToppings.includes(key)) {
      const newToppings = selectedToppings.filter(item => item !== key);
      this.setState({ [name]: newToppings });
    } else {
      this.setState(prevState => ({
        [name]: [...prevState.selectedToppings, key]
      }));
    }
  };

  handleToppingsAdd = (e, key) => {
    this.setState({ [e.target.name]: [...this.state.selectedToppings, key] });
  };

  render() {
    const { bases, frostings, toppings } = this.props;
    const { selectedBase, selectedFrosting, selectedToppings } = this.state;
    const { handleOnClick, handleAddToppings } = this;
    return (
      <div>
        <div className="bases">
          <h2>Choose A Base:</h2>
          {bases.map(base => {
            const { key, name } = base;
            console.log(key, base);
            return (
              <button
                name="selectedBase"
                onClick={e => handleOnClick(e, key)}
                key={key}
                className={selectedBase === key ? 'selected' : ''}
              >
                {name.replace(' Base', '')}
              </button>
            );
          })}
        </div>

        <div className="frostings">
          <h2>Choose A Frosting:</h2>

          {frostings.map(frosting => {
            const { key, name } = frosting;
            return (
              <button
                name="selectedFrosting"
                onClick={e => handleOnClick(e, key)}
                key={key}
                className={selectedFrosting === key ? 'selected' : ''}
              >
                {name.replace(' Frosting', '')}
              </button>
            );
          })}
        </div>

        <div className="toppings">
          <h2>Choose Toppings:</h2>

          {toppings.map(topping => {
            const { key, name } = topping;
            return (
              <button
                name="selectedToppings"
                onClick={e => handleAddToppings(e, key)}
                key={key}
                className={selectedToppings.includes(key) ? 'selected' : ''}
              >
                {name}
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
              ></input>
            </label>
          </form>
        </div>
        <button>Add Cupcake to Order</button>
      </div>
    );
  }
}

export default CupcakeCustomizer;
