import Joi from "Joi";

export const newAdminUserValidation = (req, res, next) => {
  try {
    //define the rules
    const schema = Joi.object({
      fName: Joi.string().max(20).required(),
      lName: Joi.string().max(20).required(),
      email: Joi.string().email({ minDomainSegments: 2 }),
      password: Joi.string().max(100).required(),
      phone: Joi.string().max(100).required(),
      address: Joi.string().max(100).allow("", null),
      dob: Joi.string().allow("", null),
    });
    // Give data to the rules
    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 200;
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};
