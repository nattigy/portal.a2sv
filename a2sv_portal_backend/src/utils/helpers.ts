export const isInt = (value: any) => {
  const valueNum: any = Number(value);
  return (
    !isNaN(value) && parseInt(valueNum) == value && !isNaN(parseInt(value, 10))
  );
};
