import React, { FC } from "react";
import { Link } from "react-router-dom";

const ErrorPage: FC = () => {
  return (
    <>
      <div className="section">
        <h1 className="error2">404</h1>
        <div className="page">
          Ooops!!! The page you are looking for is not found
        </div>
        <Link className="back-home" to="/addtodos">
          Back to home
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;
