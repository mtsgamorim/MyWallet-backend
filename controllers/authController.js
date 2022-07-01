import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import joi from "joi";
import { v4 as uuid } from "uuid";
import { db } from "../mongo/mongo.js";

export async function createUser(req, res) {
  const user = req.body;

  try {
    const temUserIgual = await db
      .collection("users")
      .findOne({ email: user.email });
    if (temUserIgual) {
      res.status(409).send("Email ja cadastrado");
      return;
    }
    const passwordHash = bcrypt.hashSync(user.password, 10);
    await db.collection("users").insertOne({ ...user, password: passwordHash });
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
}

export async function loginUser(req, res) {
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

  const userNoBanco = await db
    .collection("users")
    .findOne({ email: user.email });
  if (userNoBanco && bcrypt.compareSync(user.password, userNoBanco.password)) {
    const token = uuid();

    await db
      .collection("sessions")
      .deleteOne({ userId: new ObjectId(userNoBanco._id) });

    await db.collection("sessions").insertOne({
      token,
      userId: userNoBanco._id,
    });
    res.status(201).send({
      name: userNoBanco.name,
      token,
      userId: userNoBanco._id,
    });
    return;
  } else {
    res.status(401).send("Email ou senha incorreto");
  }
}
