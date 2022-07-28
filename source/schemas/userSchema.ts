import Joi from "joi";

import { UserData } from "./../utils/types.js";

export const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(10).required(),
  confirmPassword: Joi.ref('password')
});