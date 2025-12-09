import React from "react";

const Loader = ({ label = "Loading..." }) => {
  return <div className="loading-indicator">{label}</div>;
};

export default Loader;
