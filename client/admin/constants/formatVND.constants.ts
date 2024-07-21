export const formatVND = (amount: number): string => {
  const amountWithZeros = amount * 1000;
  return amountWithZeros.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };