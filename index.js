import express, { json } from "express";
import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
import walletRouter from "./routes/walletRouter.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(json());

app.use(authRouter);
app.use(walletRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log(chalk.bold.blue("Servidor funcionando"));
});
