// Please don't change the pre-written code
// Import the necessary modules here
import { body, validationResult } from "express-validator";
export const formValidation = async (req, res, next) => {
  // Write your code here
  let rules = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Email is required"),
    body("image").custom((value, { req }) => {
      if (!req.file) throw new Error("Image is required");
      return true;
    }),
  ];
  await Promise.all(rules.map((rule) => rule.run(req)));
  let validationErr = validationResult(req);
  if (!validationErr.isEmpty()) {
    return res.send({ errors: validationErr.errors });
  }
  next();
};
