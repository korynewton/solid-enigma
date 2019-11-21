import React from 'react';
import { Link } from 'react-router-dom';
import cupcake from '../../images/cupcake.png';

import './home.styles.scss';

const Home = () => {
  return (
    <div>
      <div className="image">
        <img src={cupcake} alt="cupcake" />
      </div>
      <div className="options">
        <Link to="/order">
          <button>Start a New Order</button>
        </Link>
        <Link to="/orders">
          <button>View Past Orders</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
