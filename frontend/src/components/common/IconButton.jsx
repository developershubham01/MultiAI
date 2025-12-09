import React from "react";

const IconButton = ({ children, ...rest }) => {
  return (
    <button className="icon-button" {...rest}>
      {children}
    </button>
  );
};

export default IconButton;
