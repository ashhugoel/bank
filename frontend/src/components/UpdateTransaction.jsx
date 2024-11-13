import React, { useState } from "react";
import SideBar from "./extracomponents/SideBar";
import { fetchTransactionById, updateTransaction } from "../api";  // Import your API functions

const UpdateTransaction = () => {
  const [transactionId, setTransactionId] = useState("");  // Transaction ID input
  const [transaction, setTransaction] = useState({
    data: { _id: "", userOne: "", userTwo: "", amount: "" },  // Ensure proper initial state
  });
  const [loading, setLoading] = useState(false);  // Loading state
  const [error, setError] = useState("");  // Error state

  // Handle search for a transaction by ID
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");  // Clear previous errors

    if (!transactionId) {
      setError("Please enter a valid transaction ID.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetchTransactionById(transactionId);
      const data = response.data;  // Assuming 'data' is the actual transaction object

      // Ensure the fetched data is valid
      if (data) {
        setTransaction({
          data: {
            _id: data._id || "",
            userOne: data.userOne || "",
            userTwo: data.userTwo || "",
            amount: data.amount || "",
          },
        });
      } else {
        setError("Transaction not found.");
      }

      console.log(data);  // Log the fetched data for debugging
    } catch (err) {
      setError("Transaction not found or there was an error.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");  // Clear previous errors

    // Ensure that _id is part of transaction.data
    if (!transaction.data._id || !transaction.data.userOne || !transaction.data.userTwo || !transaction.data.amount) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const updatedTransaction = await updateTransaction(transaction); // Pass full transaction object

      alert("Transaction updated successfully!");  // Show success message
      setTransaction({ data: updatedTransaction });  // Update the state with the latest transaction data  
    } catch (err) {
      setError("Error updating transaction.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <SideBar />
      <main className="flex-1 p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Update Transaction</h1>
        <p className="mb-6 text-gray-700">
          Enter the transaction ID to search for the transaction. If found, you
          can update the details below.
        </p>

        {/* Search Transaction Form */}
        <form onSubmit={handleSearch} className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto mb-8">
          <div className="mb-4">
            <label htmlFor="transaction-id" className="block text-gray-700 font-medium mb-2">
              Transaction ID
            </label>
            <input
              type="text"
              id="transaction-id"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder="Enter transaction ID"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Search
          </button>
        </form>

        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Update Transaction Form (only shown if transaction is found) */}
        {transaction.data._id && (
          <form onSubmit={handleUpdate} className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto">
            <div className="mb-4">
              <label htmlFor="sender-name" className="block text-gray-700 font-medium mb-2">
                Sender Name
              </label>
              <input
                type="text"
                id="sender-name"
                value={transaction.data.userOne}  // Access userOne from transaction.data
                onChange={(e) =>
                  setTransaction({
                    ...transaction,
                    data: { ...transaction.data, userOne: e.target.value }  // Update userOne on change
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="receiver-name" className="block text-gray-700 font-medium mb-2">
                Receiver Name
              </label>
              <input
                type="text"
                id="receiver-name"
                value={transaction.data.userTwo}  // Access userTwo from transaction.data
                onChange={(e) =>
                  setTransaction({
                    ...transaction,
                    data: { ...transaction.data, userTwo: e.target.value }  // Update userTwo on change
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="amount" className="block text-gray-700 font-medium mb-2">
                Amount in Rupees
              </label>
              <input
                type="number"
                id="amount"
                value={transaction.data.amount}  // Access the correct field for amount
                onChange={(e) =>
                  setTransaction({
                    ...transaction,
                    data: { ...transaction.data, amount: e.target.value }  // Update amount on change
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Update Transaction
            </button>
          </form>
        )}
      </main>
    </div>
  );
};

export default UpdateTransaction;
