import React, { Fragment } from "react";

const Spinner = () => {
  return (
    <Fragment>
      <img
        src={"https://miro.medium.com/max/1600/0*ptDX0HfJCYpo9Pcs.gif"}
        style={{ width: "200px", margin: "auto", display: "block" }}
        alt="Loading......"
      />
    </Fragment>
  );
};

export default Spinner;
