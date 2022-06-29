import express, { json } from "express";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(json());

app.listen(process.env.PORT || 5000, () => {
  console.log(chalk.bold.blue("Servidor funcionando"));
});
