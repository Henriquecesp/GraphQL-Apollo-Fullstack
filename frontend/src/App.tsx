import React, { useState } from "react";
import { useQuery, gql, useMutation, useSubscription } from "@apollo/client";
import Sidebar from "./Sidebar";

const GET_COUNT = gql`
  query count {
    count
  }
`;

const ADD_COUNT = gql`
  mutation addCount {
    soma: addCount {
      status
      count
    }
  }
`;

const SUB_COUNT = gql`
  mutation subtract {
    subtract: addCount(action: SUB) {
      status
      count
    }
  }
`;

const COUNTER_SUBSCRIPTION = gql`
  subscription counterOnChange {
    counterOnChange {
      count
      action
    }
  }
`;

function App() {
  const { loading } = useQuery(GET_COUNT);
  const { error, data } = useSubscription(COUNTER_SUBSCRIPTION, {
    shouldResubscribe: true,
    onSubscriptionData: (data) => console.log(data),
  });
  const [addCount] = useMutation(ADD_COUNT);
  const [subCount] = useMutation(SUB_COUNT);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleClick = (type: string) => {
    if (type === "ADD") {
      addCount();
    } else {
      subCount();
    }
  };

  return (
    <>
      <Sidebar />
      <div className="container">
        <div className="counter-container">
          <h3 className="title">Counter Using React And Apollo Client</h3>
          <button className="subtract" onClick={() => handleClick("SUB")}>
            -
          </button>
          <input
            type="text"
            className="counter"
            disabled
            value={
              (data && data.counterOnChange && data.counterOnChange.count) || ""
            }
          />
          <button className="add" onClick={() => handleClick("ADD")}>
            +
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
