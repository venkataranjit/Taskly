import React, { FC } from "react";

const Heading: FC = () => {
  return (
    <h2 className="app-heading">
      Taskly{" "}
      <span>
        <i style={{ fontSize: "20px" }}>by Ranjit</i>
      </span>
    </h2>
  );
};

export default Heading;
