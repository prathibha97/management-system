/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-unstable-nested-components */
import { TextField } from '@mui/material';
import { useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import ClientDetails from '../../components/Invoice/ClientDetails';
import Dates from '../../components/Invoice/Dates';
import Footer from '../../components/Invoice/Footer';
import Header from '../../components/Invoice/Header';
import MainDetails from '../../components/Invoice/MainDetails';
import Notes from '../../components/Invoice/Notes';
import Table from '../../components/Invoice/Table';
import TableForm from '../../components/Invoice/TableForm';

function Invoice() {
  const [showInvoice, setShowInvoice] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bankName, setBankName] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [website, setWebsite] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');
  const [description, setDescription] = useState('');
  const [qty, setQty] = useState('');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);

  const componentRef = useRef();

  return (
    <main className="m-5 p-5 rounded  shadow md:max-w-xl lg:max-w-2xl xl:max-w-4xl md:mx-auto bg-white">
      {showInvoice ? (
        <>
          <ReactToPrint
            trigger={() => (
              <button
                type="button"
                className="bg-[#1DB3AB] text-white font-bold py-2 px-8 rounded shadow hover:bg-transparent hover:text-[#1DB3AB] transition-all duration-300 mb-5 ml-5"
              >
                Print / Download
              </button>
            )}
            content={() => componentRef.current}
          />
          <div ref={componentRef} className="p-5">
            <Header />

            <MainDetails name={name} address={address} />

            <ClientDetails
              clientName={clientName}
              clientAddress={clientAddress}
            />

            <Dates
              invoiceNumber={invoiceNumber}
              invoiceDate={invoiceDate}
              dueDate={dueDate}
              bankAccount={bankAccount}
            />

            <Table
              description={description}
              amount={amount}
              price={price}
              qty={qty}
              list={list}
              total={total}
              setTotal={setTotal}
            />

            <Notes notes={notes} />

            <Footer
              address={address}
              bankName={bankName}
              email={email}
              name={name}
              phone={phone}
              website={website}
            />
          </div>
          <button
            type="button"
            className="bg-[#1DB3AB] text-white font-bold py-2 px-8 rounded shadow hover:bg-transparent hover:text-[#1DB3AB] transition-all duration-300"
            onClick={() => setShowInvoice(false)}
          >
            Edit Information
          </button>
        </>
      ) : (
        <div className="flex flex-col justify-center">
          <article className="md:grid grid-cols-2 gap-10">
            <div className="flex flex-col">
              <label htmlFor="name">Your full name</label>
              <TextField
                type="text"
                name="text"
                id="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="address">Enter your address</label>
              <TextField
                type="text"
                name="text"
                id="address"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </article>

          <article className="md:grid grid-cols-3 gap-10">
            <div className="flex flex-col">
              <label htmlFor="email">Enter your email</label>
              <TextField
                type="email"
                name="text"
                id="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="website">Enter your website</label>
              <TextField
                type="url"
                name="text"
                id="website"
                placeholder="Enter your website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="phone">Enter your phone number</label>
              <TextField
                type="text"
                name="text"
                id="phone"
                placeholder="Enter your phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </article>

          <article className="md:grid grid-cols-2 gap-10">
            <div className="flex flex-col">
              <label htmlFor="bankName">Enter your bank name </label>
              <TextField
                type="text"
                name="text"
                id="bankName"
                placeholder="Enter your bank name"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="bankAccount">
                Enter your bank account number{' '}
              </label>
              <TextField
                type="text"
                name="text"
                id="bankAccount"
                placeholder="Enter your bank number"
                value={bankAccount}
                onChange={(e) => setBankAccount(e.target.value)}
              />
            </div>
          </article>

          <article className="md:grid grid-cols-2 gap-10 md:mt-16">
            <div className="flex flex-col">
              <label htmlFor="clientName">Enter your client name </label>
              <TextField
                type="text"
                name="text"
                id="clientName"
                placeholder="Enter your client name"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="clientAddress">Enter your client address </label>
              <TextField
                type="text"
                name="text"
                id="clientAddress"
                placeholder="Enter your client address"
                value={clientAddress}
                onChange={(e) => setClientAddress(e.target.value)}
              />
            </div>
          </article>

          <article className="md:grid grid-cols-3 gap-10">
            <div className="flex flex-col">
              <label htmlFor="invoiceNumber">Invoice Number </label>
              <TextField
                type="text"
                name="text"
                id="invoiceNumber"
                placeholder="Invoice number"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="invoiceDate">Invoice Date </label>
              <TextField
                type="date"
                name="text"
                id="invoiceDate"
                placeholder="Invoice date"
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="dueDate">Due Date </label>
              <TextField
                type="date"
                name="text"
                id="dueDate"
                placeholder="Due date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </article>

          {/* Table form */}
          <article>
            <TableForm
              description={description}
              setDescription={setDescription}
              amount={amount}
              price={price}
              qty={qty}
              setAmount={setAmount}
              setPrice={setPrice}
              setQty={setQty}
              setList={setList}
              list={list}
              total={total}
              setTotal={setTotal}
            />
          </article>

          <label htmlFor="notes">Additional Notes </label>
          <textarea
            name="notes"
            id="notes"
            cols="30"
            rows="10"
            placeholder="Additional notes to client"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <button
            type="button"
            className="mt-5 bg-[#1DB3AB] text-white font-bold py-2 px-8 rounded shadow hover:bg-transparent hover:text-[#1DB3AB] transition-all duration-300"
            onClick={() => setShowInvoice(true)}
          >
            Preview Invoice
          </button>
        </div>
      )}
    </main>
  );
}

export default Invoice;
