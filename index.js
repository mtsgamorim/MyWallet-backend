import express, { json } from "express";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import joi from "joi";
import { v4 as uuid } from "uuid";

dotenv.config();

const app = express();

app.use(cors());
app.use(json());

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;

mongoClient.connect().then(() => {
  db = mongoClient.db(process.env.MONGO_DATABASE);
});

app.post("/cadastro", async (req, res) => {
  const user = req.body;

  const userSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
  });

  const validation = userSchema.validate(user);
  if (validation.error) {
    res.status(400).send("Campos invalidos para cadastro");
    return;
  }

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
});

app.listen(process.env.PORT || 5000, () => {
  console.log(chalk.bold.blue("Servidor funcionando"));
});
