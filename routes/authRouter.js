import { Router } from "express";
import { createUser, loginUser } from "../controllers/authController.js";
import validateCadastro from "../middlewares/validateCadastro.js";
import validateCamposLogin from "../middlewares/validateCamposLogin.js";

const router = Router();

router.post("/cadastro", validateCadastro, createUser);
router.post("/login", validateCamposLogin, loginUser);

export default router;
