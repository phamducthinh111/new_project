export const regexConstant = {
  // strong password: at least 8 characters 1 symbol 1 Upper 1 number
  password:/^[^\s@$!%*?&]+$/,
  validEmail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  // maximum of 50 characters
  lengthExceeded: /^.{1,49}$/,
  validPhone: /^\d+$/,
  username: /^[^\s]+$/,
};
