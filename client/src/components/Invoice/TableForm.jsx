/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-plusplus */
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { v4 as uuid } from 'uuid';

function TableForm({
  description,
  price,
  setPrice,
  qty,
  setQty,
  setDescription,
  amount,
  setAmount,
  list,
  setList,
  total,
  setTotal,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description || !qty || !price) {
      <Alert severity="error">Fill in all required inputs</Alert>;
    } else {
      const newItem = {
        id: uuid(),
        description,
        qty,
        price,
        amount,
      };

      setDescription('');
      setQty('');
      setPrice('');
      setAmount('');
      setIsEditing(false);
      setList([...list, newItem]);
    }
  };

  const deleteRow = (id) => {
    setList(list.filter((row) => row.id !== id));
  };

  const editRow = (id) => {
    const editingRow = list.find((row) => row.id === id);
    setList(list.filter((row) => row.id !== id));
    setIsEditing(true);
    setDescription(editingRow.description);
    setQty(editingRow.qty);
    setPrice(editingRow.price);
  };

  useEffect(() => {
    const calculateAmount = () => {
      setAmount(qty * price);
    };
    calculateAmount(amount);
  }, [amount, setAmount, price, qty]);

  useEffect(() => {
    // calculate total amount of items in table
    const rows = document.querySelectorAll('.amount');
    let sum = 0;

    for (let i = 0; i < rows.length; i++) {
      if (rows[i].className === 'amount') {
        sum += Number.isNaN(rows[i].innerHTML)
          ? 0
          : parseInt(rows[i].innerHTML, 10);
        setTotal(sum);
      }
    }
  });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="md:mt-16">
          <div className="flex flex-col">
            <label htmlFor="description"> Item Description</label>
            <TextField
              type="text"
              name="description"
              id="description"
              placeholder="Item Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="md:grid grid-cols-3 gap-10">
            <div className="flex flex-col">
              <label htmlFor="qty"> Quantity</label>
              <TextField
                type="text"
                name="qty"
                id="qty"
                placeholder="Item Description"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="price"> Price</label>
              <TextField
                type="text"
                name="price"
                id="price"
                placeholder="Item Description"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="amount"> Amount</label>
              <p>{amount}</p>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="mt-5 bg-[#1DB3AB] text-white font-bold py-2 px-8 rounded shadow hover:bg-transparent hover:text-[#1DB3AB] transition-all duration-300 mb-5"
        >
          {isEditing ? 'Edit Row Item' : 'Add Table Item'}
        </button>
      </form>
      {/* table items */}
      <section>
        <table width="100%" className="mb-10">
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
                  <td className="amount">{amount}</td>
                  <td>
                    <button type="button" onClick={() => deleteRow(id)}>
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="text-red-500 font-bold text-xl"
                      />
                    </button>
                  </td>
                  <td>
                    <button type="button" onClick={() => editRow(id)}>
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className="text-green-500 font-semibold text-lg"
                      />
                    </button>
                  </td>
                </tr>
              </tbody>
            </React.Fragment>
          ))}
        </table>
      </section>
      <div>
        <h2 className="flex items-end justify-end text-gray-800 text-4xl font-bold">
          Rs. {total.toLocaleString()}
        </h2>
      </div>
    </>
  );
}

export default TableForm;
