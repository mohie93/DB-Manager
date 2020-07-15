const Joi = require("@hapi/joi");

exports.validateCreatePayload = async (params) => {
  const schema = Joi.object({
    databaseName: Joi.string().required().min(6).max(20),
  });

  try {
    await schema.validateAsync(params);
    return { hasError: false, errors: [] };
  } catch (errs) {
    return {
      hasError: true,
      errors: errs.details.map((err) => {
        return err.message;
      }),
    };
  }
};

exports.validateDeletePayload = async (params) => {
  const schema = Joi.object({
    databaseName: Joi.string().required().min(6).max(20),
  });

  try {
    await schema.validateAsync(params);
    return { hasError: false, errors: [] };
  } catch (errs) {
    return {
      hasError: true,
      errors: errs.details.map((err) => {
        return err.message;
      }),
    };
  }
};
