import { body } from "express-validator";

export const validation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required.'),

    body('email')
        .trim()
        .notEmpty()
        .withMessage('E-mail is required.')
        .isEmail().withMessage('Enter valid E-mail'),

    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password is required.')
        .isStrongPassword()
        .withMessage('Password must be 8 characters with uppercase, lowercase, number, and special character.')
]

export const productValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required.'),

    body('price')
        .notEmpty()
        .withMessage('Price is required.')
        .isNumeric()
        .withMessage('Price must be a number.'),

    body('description')
        .trim()
        .notEmpty()
        .withMessage('Description is required.'),

    body('category')
        .trim()
        .notEmpty()
        .withMessage('Category is required.')
]

export const categoryValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required.')
]