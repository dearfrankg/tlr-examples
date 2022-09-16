import styles from "./Counter.module.css";
import React, { useState } from "react";
import { useSelector, useDispatch, Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/components/example3/counter-slice";
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from "./counter-slice";

const resources = {
  components: {
    Row: ({ children }) => <div className={styles.row}>{children}</div>,

    DecButton: ({ dispatch }) => (
      <button
        className={styles.button}
        aria-label="Decrement value"
        onClick={() => dispatch(decrement())}
      >
        -
      </button>
    ),

    Count: ({ count }) => <span className={styles.value}>{count}</span>,

    IncButton: ({ dispatch }) => (
      <button
        className={styles.button}
        aria-label="Increment value"
        onClick={() => dispatch(increment())}
      >
        +
      </button>
    ),

    Amount: ({ incrementAmount, setIncrementAmount }) => (
      <input
        className={styles.textbox}
        aria-label="Set increment amount"
        value={incrementAmount}
        onChange={(e) => setIncrementAmount(e.target.value)}
      />
    ),

    AddAmountButton: ({ dispatch, incrementAmount }) => (
      <button
        className={styles.button}
        onClick={() => dispatch(incrementByAmount(Number(incrementAmount) || 0))}
      >
        Add Amount
      </button>
    ),

    AddAsyncButton: ({ dispatch, incrementAmount }) => (
      <button
        className={styles.asyncButton}
        onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
      >
        Add Async
      </button>
    ),

    Counter: () => {
      const count = useSelector(selectCount);
      const dispatch = useDispatch();
      const [incrementAmount, setIncrementAmount] = useState("2");

      const { Row, DecButton, Count, IncButton, Amount, AddAmountButton, AddAsyncButton } =
        resources.components;

      return (
        <div>
          <Row>
            <DecButton {...{ dispatch }} />
            <Count count={count} />
            <IncButton {...{ dispatch }} />
          </Row>
          <Row>
            <Amount {...{ incrementAmount, setIncrementAmount }} />
            <AddAmountButton {...{ dispatch, incrementAmount }} />
            <AddAsyncButton {...{ dispatch, incrementAmount }} />
          </Row>
        </div>
      );
    },
  },

  redux: {
    makeStore: () => {
      return configureStore({
        reducer: {
          counter: counterReducer,
        },
      });
    },
  },
};

const { Counter } = resources.components;
const { makeStore } = resources.redux;

const store = makeStore();

export default function () {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}

export { makeStore, Counter };
