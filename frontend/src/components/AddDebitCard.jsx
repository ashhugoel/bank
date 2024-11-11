import React, { useState } from "react";
import SideBar from "./extracomponents/SideBar";

function AddDebitCard() {
  const [form, setForm] = useState({
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    accountLink: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure the CVV is stored as a string to keep leading zeros
    const formattedForm = {
      ...form,
      cardNumber: form.cardNumber.replace(/\s+/g, ""), // Remove spaces if entered
      cvv: form.cvv.toString(),
    };

    try {
      console.log("form", formattedForm);
      const response = await fetch("/api/debitCard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedForm),
      });

      if (response.status === 201) {
        alert("Debit Card added successfully");
      } else {
        throw new Error("Failed to add debit card");
      }

      const result = await response.json();
      console.log("Debit Card added:", result);
    } catch (error) {
      console.error("Error adding debit card:", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
      <SideBar />
      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl font-bold mb-6">Add Debit Card</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="cardholderName">
                Cardholder Name
              </label>
              <input
                type="text"
                id="cardholderName"
                name="cardholderName"
                value={form.cardholderName}
                onChange={handleChange}
                className="border rounded-lg w-full p-2"
                placeholder="Cardholder Name"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="cardNumber">
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={form.cardNumber}
                onChange={handleChange}
                className="border rounded-lg w-full p-2"
                placeholder="1234 5678 9123 4567"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="expiryDate">
                Expiry Date
              </label>
              <input
                type="month"
                id="expiryDate"
                name="expiryDate"
                value={form.expiryDate}
                onChange={handleChange}
                className="border rounded-lg w-full p-2"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="cvv">
                CVV
              </label>
              <input
                type="password"
                id="cvv"
                name="cvv"
                value={form.cvv}
                onChange={handleChange}
                className="border rounded-lg w-full p-2"
                placeholder="CVV"
                maxLength="3"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="accountLink">
                Linked Account
              </label>
              <input
                type="text"
                id="accountLink"
                name="accountLink"
                value={form.accountLink}
                onChange={handleChange}
                className="border rounded-lg w-full p-2"
                placeholder="Account Number or ID"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 w-full"
          >
            Add Debit Card
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddDebitCard;
