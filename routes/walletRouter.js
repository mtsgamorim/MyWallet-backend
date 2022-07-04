import { Router } from "express";
import validateToken from "../middlewares/validateToken.js";
import { validateCamposWallet } from "../middlewares/validateCamposWallet.js";
import {
  walletAdd,
  walletDelete,
  walletReceber,
} from "../controllers/walletController.js";

const router = Router();

router.get("/wallet", validateToken, walletReceber);
router.post("/walletAdd", validateToken, validateCamposWallet, walletAdd);
router.post("/walletDelete", validateToken, validateCamposWallet, walletDelete);

export default router;
