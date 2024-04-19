import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2024-04-17"),
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 89.99,
    date: new Date("2024-04-15"),
  },
  {
    id: "e3",
    description: "A pair of chair",
    amount: 99.99,
    date: new Date("2023-08-11"),
  },
  {
    id: "e4",
    description: "Some bananas",
    amount: 15.99,
    date: new Date("2023-07-02"),
  },
  {
    id: "e5",
    description: "Some apples",
    amount: 10.99,
    date: new Date("2023-06-02"),
  },
  {
    id: "e6",
    description: "Some melons",
    amount: 112.99,
    date: new Date("2023-05-02"),
  },
  {
    id: "e7",
    description: "Some appricot",
    amount: 12.99,
    date: new Date("2023-04-02"),
  },
  {
    id: "e8",
    description: "Some kiwi",
    amount: 11.99,
    date: new Date("2023-03-02"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense({ description, amount, date }) {},
  deleteExpense(id) {},
  updateExpense(id, { description, amount, date }) {},
});

function expensesReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...payload }, ...state];
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === payload.id
      );
      const updatableExpense = (state = [updatableExpenseIndex]);
      const updatedItem = { ...updatableExpense, ...payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    addExpense,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
