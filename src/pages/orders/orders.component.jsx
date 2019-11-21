import React from 'react';
import axios from 'axios';

import './orders.styles.scss';

import SortingOptions from '../../components/sorting-options/sorting-options.component';
class Orders extends React.Component {
  state = {
    orders: [],
    toppingfilters: ['any'],
    baseFilter: 'any',
    frostingFilter: 'any',
    filteredItems: [],
    bases: [],
    frostings: [],
    toppings: []
  };
  async componentDidMount() {
    // retrieve orders from backend
    const baseURL = 'http://localhost:4000/cupcakes';
    const [basesRes, frostingsRes, toppingsRes, ordersRes] = await Promise.all([
      axios.get(`${baseURL}/bases`),
      axios.get(`${baseURL}/frostings`),
      axios.get(`${baseURL}/toppings`),
      axios.get(`${baseURL}/orders`)
    ]);

    const defaultSort = ordersRes.data.orders.sort(
      (a, b) => new Date(a.delivery_date) - new Date(b.delivery_date)
    );

    this.setState({
      bases: basesRes.data.bases,
      frostings: frostingsRes.data.frostings,
      toppings: toppingsRes.data.toppings,
      orders: defaultSort
    });
  }

  handleSelectChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      this.filterOrders();
    });
  };

  handleSelectToppingChange = e => {
    const { toppingfilters } = this.state;
    const { value } = e.target;
    if (toppingfilters.includes('any') || value === 'any') {
      this.setState({ toppingfilters: [value] }, () => this.filterOrders());
    } else {
      if (!toppingfilters.includes(value)) {
        this.setState(
          prevState => ({
            toppingfilters: [...prevState.toppingfilters, value]
          }),
          () => this.filterOrders()
        );
      }
    }
  };

  filterOrders = () => {
    const { orders, baseFilter, frostingFilter, toppingfilters } = this.state;

    const filteredBases = new Set();
    // filter by selected base
    orders.forEach(order => {
      order.cupcakes.forEach(cupcake => {
        // check filter key
        if (baseFilter !== 'any') {
          if (baseFilter === cupcake.base.key) {
            filteredBases.add(order);
          }
        } else {
          filteredBases.add(order);
        }
      });
    });

    // from filter bases, filter by frosting
    const filteredFrostings = new Set();
    filteredBases.forEach(order => {
      order.cupcakes.forEach(cupcake => {
        // check filter key
        if (frostingFilter !== 'any') {
          if (frostingFilter === cupcake.frosting.key) {
            filteredFrostings.add(order);
          }
        } else {
          filteredFrostings.add(order);
        }
      });
    });

    // from filtered frostings, filter by toppings
    const finalFilter = new Set();
    filteredFrostings.forEach(order => {
      order.cupcakes.forEach(cupcake => {
        if (!toppingfilters.includes('any')) {
          cupcake.toppings.forEach(topping => {
            if (toppingfilters.includes(topping.key)) {
              finalFilter.add(order);
            }
          });
        } else {
          finalFilter.add(order);
        }
      });
    });

    this.setState({ filteredItems: [...finalFilter] });
  };

  changeSort = direction => {
    const { filteredItems, orders } = this.state;
    if (filteredItems.length) {
      let newFiltered;
      if (direction === 'ascending') {
        newFiltered = filteredItems.sort(
          (a, b) => new Date(a.delivery_date) - new Date(b.delivery_date)
        );
      } else {
        newFiltered = filteredItems.sort(
          (a, b) => new Date(b.delivery_date) - new Date(a.delivery_date)
        );
      }
      this.setState({ filteredItems: newFiltered });
    } else {
      let newOrders;
      if (direction === 'ascending') {
        newOrders = orders.sort(
          (a, b) => new Date(a.delivery_date) - new Date(b.delivery_date)
        );
      } else {
        newOrders = orders.sort(
          (a, b) => new Date(b.delivery_date) - new Date(a.delivery_date)
        );
      }
      this.setState({ orders: newOrders });
    }
  };

  render() {
    const { bases, frostings, toppings, orders, filteredItems } = this.state;
    const { changeSort, handleSelectChange, handleSelectToppingChange } = this;
    return (
      <div>
        <SortingOptions
          bases={bases}
          frostings={frostings}
          toppings={toppings}
          changeSort={changeSort}
          handleSelectChange={handleSelectChange}
          handleSelectToppingChange={handleSelectToppingChange}
        />

        <h2>Orders:</h2>

        <table>
          <tbody>
            <tr>
              <th>Order ID:</th>
              <th>Delivery Date:</th>
            </tr>
          </tbody>
          <tbody>
            {!filteredItems.length
              ? orders.map(order => {
                  const date = new Date(`${order.delivery_date}`);
                  return (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{date.toLocaleString()}</td>
                    </tr>
                  );
                })
              : filteredItems.map(item => {
                  const date = new Date(`${item.delivery_date}`);
                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{date.toLocaleString()}</td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Orders;
