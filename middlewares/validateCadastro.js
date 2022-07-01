import joi from "joi";

function validateCadastro(req, res, next) {
  const user = req.body;

  const userSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
  });

  const validation = userSchema.validate(user);
  if (validation.error) {
    res.status(422).send("Campos invalidos para cadastro");
    return;
  }

  next();
}

export default validateCadastro;
