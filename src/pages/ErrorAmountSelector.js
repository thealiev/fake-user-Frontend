import React from "react";

const ErrorAmountSelector = ({ errorAmount, setErrorAmount }) => {
  const handleChange = (event, isBlur = false) => {
    let value = Number(event.target.value);
    if (isBlur || (event.type === "change" && event.target.type === "number")) {
      value = Math.min(Math.max(value, 0), 100);
    }
    setErrorAmount(value);
  };

  return (
    <>
      <div className="flex items-center space-x-4">
        <input
          type="range"
          min="0"
          max="100"
          value={errorAmount ?? 0}
          onChange={handleChange}
          className="w-64"
        />
        <input
          type="number"
          min="0"
          max="100"
          value={errorAmount ?? 0}
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleChange(e, true)}
          className="w-20 px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>
    </>
  );
};

export default ErrorAmountSelector;
