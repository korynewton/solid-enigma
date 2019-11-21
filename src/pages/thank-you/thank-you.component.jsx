import React from 'react';

import './thank-you.styles.scss';

const ThankYou = ({ history }) => {
  return (
    <div className="thank-you">
      <h2>Thank you for your order!</h2>
      <button onClick={() => history.push('/')}>Home</button>
    </div>
  );
};

export default ThankYou;
