import React, { useState, useReducer } from "react";
import axios from "axios";

const resources = {
  components: {
    Button: ({ handle, buttonClicked }) => {
      const buttonText = buttonClicked ? "Ok" : "Load Greeting";

      return (
        <button onClick={handle.fetchGreeting} disabled={buttonClicked}>
          {buttonText}
        </button>
      );
    },

    Greeting: ({ show, greeting }) => {
      if (!show) return null;

      return <h1>{greeting}</h1>;
    },

    Error: ({ show }) => {
      if (!show) return null;

      return <p role="alert">Oops, failed to fetch!</p>;
    },
  },

  fetchGreeting: async ({ url, dispatch, setButtonClicked }) =>
    axios
      .get(url)
      .then((response) => {
        const { data } = response;
        const { greeting } = data;
        dispatch({ type: "SUCCESS", greeting });
        setButtonClicked(true);
      })
      .catch((error) => {
        dispatch({ type: "ERROR", error });
      }),

  greetingReducer: (state, action) => {
    switch (action.type) {
      case "SUCCESS": {
        return {
          error: null,
          greeting: action.greeting,
        };
      }
      case "ERROR": {
        return {
          error: action.error,
          greeting: null,
        };
      }
      default: {
        return state;
      }
    }
  },

  initialState: {
    error: null,
    greeting: null,
  },
};

export default function Greet({ url }) {
  const [{ error, greeting }, dispatch] = useReducer(
    resources.greetingReducer,
    resources.initialState
  );
  const [buttonClicked, setButtonClicked] = useState(false);

  const handle = {
    fetchGreeting: () => resources.fetchGreeting({ url, dispatch, setButtonClicked }),
  };

  const { Button, Greeting, Error } = resources.components;

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Button {...{ handle, buttonClicked }} />
      <Greeting {...{ show: greeting, greeting }} />
      <Error {...{ show: error }} />
    </div>
  );
}
