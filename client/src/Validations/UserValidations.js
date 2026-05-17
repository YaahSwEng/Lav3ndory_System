// Importing the Yup library, which helps us validate form inputs
import * as yup from "yup";

// Creating a validation schema for the registration form
export const userSchemaValidation = yup.object().shape({
  // Name must be text and required
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),

  // Email must be valid email format and required
  email: yup
    .string()
    .email("Not valid email format")
    .required("Email is required"),

  // Phone number must be required and should contain only numbers
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Phone number must contain only numbers")
    .min(8, "Phone number must be at least 8 digits")
    .max(12, "Phone number must not be more than 12 digits"),

  // Gender must be selected
  gender: yup
    .string()
    .required("Gender is required"),

  // Age category must be selected from the dropdown list
  ageCategory: yup
    .string()
    .required("Age category is required"),

// Password must be secure and contain different character types
password: yup
  .string()
  .required("Password is required")
  .min(8, "Password must be at least 8 characters")
  .max(20, "Password must not be more than 20 characters")
  .matches(
    /[a-z]/,
    "Password must contain at least one lowercase letter"
  )
  .matches(
    /[A-Z]/,
    "Password must contain at least one uppercase letter"
  )
  .matches(
    /[0-9]/,
    "Password must contain at least one number"
  )
  .matches(
    /[^a-zA-Z0-9]/,
    "Password must contain at least one special character"
  ),

  // Confirm password must match the password field
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords Don't Match")
    .required("Confirm password is required"),
});