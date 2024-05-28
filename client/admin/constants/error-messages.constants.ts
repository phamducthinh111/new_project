export const errorMessages = {
  username: {
    required: "Please input your Username!",
    maxlength: "The maximum total length of a username is 64 characters.",
    pattern: 'Please enter a valid Username!',
  },
  password: {
    required: "Please input your Password!",
    pattern:
      "Password is invalid",
  },
  email: {
    require: 'Please enter an email address!',
    pattern: 'Please enter a valid email address!',
  },
  phone: {
    required: "Please input your phone number!",
    maxlength: "Phone number cannot exceed 20 characters!",
    minlength: "Phone number must be at least 9 characters",
    pattern: "Phone number must be only digits!",
  },
  address: {
    required: "Please input your Address!",
  },
  role: {
    required: "Please select your Role!",
  }
};
