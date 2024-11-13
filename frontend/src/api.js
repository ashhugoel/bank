import axios from 'axios';

// Set API_URL based on the environment (development or production)
const API_URL = '/api'; // Change this to your production URL if necessary

console.log(API_URL);

// Add a new user
export const addUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/add`, userData);
    return response.data; // Response data from backend
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

// Fetch all users
export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/customers`);
    return response.data; // Response data from backend
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Fetch a single user by ID
export const fetchUserById = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/customers/${userId}`);
    return response.data; // Response data from backend
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

// Update a user
export const updateUser = async (userData) => {
  try {
    const response = await axios.put(`${API_URL}/update`, userData);
    return response.data; // Response data from backend
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

// Delete a user
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${userId}`);
    return response.data; // Response data from backend
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

// Transfer money between users
export const transferMoney = async (transactionData) => {
  try {
    const response = await axios.put(`${API_URL}/customer/money`, transactionData);
    return response.data; // Response data from backend
  } catch (error) {
    console.error("Error transferring money:", error);
    throw error;
  }
};

// Create a transaction
export const createTransaction = async (transactionData) => {
  try {
    const response = await axios.post(`${API_URL}/transactions`, transactionData);
    return response.data; // Response data from backend
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw error;
  }
};

// Fetch all transactions
export const fetchTransactions = async () => {
  try {
    const response = await axios.get(`${API_URL}/get-transactions`);
    return response.data; // Response data from backend
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

// Fetch a single transaction by ID
export const fetchTransactionById = async (transactionId) => {
  try {
    const response = await axios.get(`${API_URL}/get-transaction/${transactionId}`);
    return response.data; // Response data from backend
  } catch (error) {
    console.error("Error fetching transaction by ID:", error);
    throw error;
  }
};

// Delete a transaction
export const deleteTransaction = async (transactionId) => {
  try {
    const response = await axios.delete(`${API_URL}/delete-transaction/${transactionId}`);
    return response.data; // Response data from backend
  } catch (error) {
    console.error("Error deleting transaction:", error);
    throw error;
  }
};


export const updateTransaction = async (transactionData) => {
  try {
    // Ensure that we are passing the correct transaction data structure
    console.log("in api.js", transactionData);

    // Correctly structure the payload
    const payload = {
      userOne: transactionData.data.userOne,
      userTwo: transactionData.data.userTwo,
      amount: transactionData.data.amount,
    };

    console.log("Sending update with payload:", payload);
    console.log(`${API_URL}/update-transaction/${transactionData.data._id}`)  // Debugging the payload being sent

    // Update request to the API, pass the ID from transactionData.data._id
    const response = await axios.put(`${API_URL}/update-transaction/${transactionData.data._id}`, payload);
    
    return response.data;  // Return the updated transaction data
  } catch (error) {
    console.error("Error updating transaction:", error);
    throw error;  // Throw error so it can be handled in the calling function
  }
};



