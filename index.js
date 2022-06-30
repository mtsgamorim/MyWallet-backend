import express, { json } from "express";
import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";
import { createUser, loginUser } from "./controllers/authController.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(json());

//Auth endpoints
app.post("/cadastro", createUser);
app.post("/login", loginUser);

app.listen(process.env.PORT || 5000, () => {
  console.log(chalk.bold.blue("Servidor funcionando"));
});
