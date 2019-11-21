import React from 'react';

const SortingOptions = ({
  bases,
  frostings,
  toppings,
  changeSort,
  handleSelectChange,
  handleSelectToppingChange
}) => {
  return (
    <div className="sorting-options">
      <div className="by-date">
        <h3>Date:</h3>
        <select onChange={e => changeSort(e.target.value)}>
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
      </div>

      <div className="by-base">
        <h3>Base:</h3>
        <select name="baseFilter" onChange={e => handleSelectChange(e)}>
          <option value="any">Any</option>
          {bases.map(base => (
            <option key={base.key} value={base.key}>
              {base.name.replace(' Base', '')}
            </option>
          ))}
        </select>
      </div>

      <div className="by-frosting">
        <h3>Frosting:</h3>
        <select name="frostingFilter" onChange={e => handleSelectChange(e)}>
          <option value="any">Any</option>
          {frostings.map(frosting => (
            <option key={frosting.key} value={frosting.key}>
              {frosting.name.replace(' Frosting', '')}
            </option>
          ))}
        </select>
      </div>

      <div className="by-toppings">
        <h3>Toppings:</h3>
        <select
          onChange={e => handleSelectToppingChange(e)}
          name="selectedToppings"
        >
          <option value="any">Any</option>
          {toppings.map(topping => (
            <option key={topping.key} value={topping.key}>
              {topping.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SortingOptions;
