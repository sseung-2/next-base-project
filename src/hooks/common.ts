export const formatNumber = (value: string): string => {
  const numberValue = parseFloat(value);
  if (isNaN(numberValue)) return value;
  return numberValue.toLocaleString("en-US");
};
