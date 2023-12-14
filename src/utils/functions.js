export const colorChange = (i) => {
  switch (i % 3) {
    case 0:
      return "first";
    case 1:
      return "second";
    default:
      return "third";
  }
};

export const findID = (Array, value) => {
  return Array.find((item) => item.name === value);
};
