import * as yup from "yup";

export const toolSchemaValidation = yup.object({

  toolid: yup
    .string()
    .matches(/^T/, "Tool ID must start with T")
    .required("Tool ID is required"),

  toolname: yup
    .string()
    .required("Tool Name is required"),

  description: yup
    .string()
    .required("Description is required"),

  condition: yup
    .string()
    .required("Condition is required"),

  category: yup
    .string()
    .required("Category is required"),

  availability: yup
    .string()
    .required("Availability is required"),

  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be positive"),

});