import joi from "joi";
function validateCamposLogin(req, res, next) {
  const user = req.body;

  const userSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  });

  const validation = userSchema.validate(user);
  if (validation.error) {
    res.status(422).send("Campos Invalidos");
    return;
  }

  next();
}

export default validateCamposLogin;
