import React from "react";
import NumberFormat from "react-number-format";

const NumberFormatMask = ({ value, isString }) => {
  return (
    <NumberFormat
      value={value}
      displayType="text"
      thousandSeparator={true}
      prefix={"₱"}
      decimalScale={2}
      fixedDecimalScale={true}
      isNumericString={isString ? true : false}
    />
  );
};

export default NumberFormatMask;
