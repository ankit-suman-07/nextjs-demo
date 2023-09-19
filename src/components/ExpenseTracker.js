// components/ExpenseTracker.js
'use client'
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { setExpenses } from "../redux/expensesSlice";

const ExpenseTracker = () => {
  const [expense, setExpense] = useState("");
  const [cost, setCost] = useState("");
  const [date, setDate] = useState("");

  const expenses = useSelector((state) => state.expenses.expenses);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expensesCollection = collection(db, "expenses");
        const querySnapshot = await getDocs(expensesCollection);
        const expensesData = [];

        querySnapshot.forEach((doc) => {
          expensesData.push({ id: doc.id, ...doc.data() });
        });

        dispatch(setExpenses(expensesData));
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newExpense = {
      expense,
      cost: parseFloat(cost),
      date,
    };

    try {
      const docRef = await addDoc(collection(db, "expenses"), newExpense);
      dispatch(addExpense({ id: docRef.id, ...newExpense }));

      // Clear input fields
      setExpense("");
      setCost("");
      setDate("");
    } catch (error) {
      console.error("Error adding expense: ", error);
    }
  };

  return (
    <div>
      <h2>Expense Tracker</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Expense"
            value={expense}
            onChange={(e) => setExpense(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="date"
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Expense</button>
      </form>
      <div>
        <h3>Expense History</h3>
        <ul>
          {expenses.map((expense) => (
            <li key={expense.id}>
              {expense.expense} - ${expense.cost} - {expense.date}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExpenseTracker;
