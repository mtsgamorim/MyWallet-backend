import { ObjectId } from "mongodb";
import dayjs from "dayjs";
import { db } from "../mongo/mongo.js";

export async function walletReceber(req, res) {
  const id = res.locals.id;

  try {
    const temValores = await db
      .collection("wallet")
      .find({ userId: new ObjectId(id) })
      .toArray();
    if (temValores.length > 0) {
      res.status(200).send(temValores);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.sendStatus(500);
  }
}

export async function walletAdd(req, res) {
  const body = req.body;
  const id = res.locals.id;
  try {
    await db.collection("wallet").insertOne({
      userId: id,
      valor: body.valor,
      descricao: body.descricao,
      soma: true,
      day: dayjs().format("DD/MM"),
    });
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
}

export async function walletDelete(req, res) {
  const body = req.body;
  const id = res.locals.id;
  try {
    await db.collection("wallet").insertOne({
      userId: id,
      valor: body.valor,
      descricao: body.descricao,
      soma: false,
      day: dayjs().format("DD/MM"),
    });
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
}
