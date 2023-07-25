/* eslint-disable no-shadow */
import React from 'react';

function Table({ description, price, qty, amount, list, total }) {
  console.log(description, price, qty, amount);
  return (
    <>
      <table width="100%">
        <thead>
          <tr className="bg-gray-100">
            <td className="font-bold">Description</td>
            <td className="font-bold">Quantity</td>
            <td className="font-bold">Price</td>
            <td className="font-bold">Amount</td>
          </tr>
        </thead>
        {list.map(({ description, qty, price, amount, id }) => (
          <React.Fragment key={id}>
            <tbody>
              <tr>
                <td>{description}</td>
                <td>{qty}</td>
                <td>{price}</td>
                <td>{amount}</td>
              </tr>
            </tbody>
          </React.Fragment>
        ))}
      </table>
      <div>
        <h2 className="flex items-end justify-end text-gray-800 text-4xl font-bold mt-5">
          Rs. {total.toLocaleString()}
        </h2>
      </div>
    </>
  );
}

export default Table;
