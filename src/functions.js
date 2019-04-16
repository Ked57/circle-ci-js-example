const upperCase = string => {
  if (typeof string !== "string") {
    throw new Error("You need to provide a string");
  }
  return string.toUpperCase();
};
const addAHundred = number => {
  if (typeof number !== "number") {
    throw new Error("You need to provide a number");
  }
  return number + 100;
};

exports.upperCase = upperCase;
exports.addAHundred = addAHundred;
