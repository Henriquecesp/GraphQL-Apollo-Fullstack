import React from "react";
import { gql, useSubscription } from "@apollo/client";

const COUNTER_SUBSCRIPTION = gql`
  subscription counterOnChange {
    counterOnChange {
      count
      action
    }
  }
`;

function Sidebar() {
  const { loading, error, data } = useSubscription(COUNTER_SUBSCRIPTION, {
    shouldResubscribe: true,
    onSubscriptionData: (data) => console.log("new data", data),
  });

  if (loading)
    return (
      <div className="sidebar">
        <p className="title">Loading...</p>
      </div>
    );
  if (error) return <p>Error :(</p>;

  return (
    <div className="sidebar">
      <h3 className="title">
        {data && data.counterOnChange && data.counterOnChange.count}
      </h3>
    </div>
  );
}

export default Sidebar;
