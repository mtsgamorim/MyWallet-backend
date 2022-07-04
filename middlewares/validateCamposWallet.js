import joi from "joi";

export async function validateCamposWallet(req, res, next) {
  const user = req.body;
  const id = res.locals.id;

  const userSchema = joi.object({
    valor: joi.number().required(),
    descricao: joi.string().required(),
  });

  const validation = userSchema.validate(user);
  if (validation.error) {
    res.status(422).send("Campos Invalidos");
    return;
  }

  next();
}
