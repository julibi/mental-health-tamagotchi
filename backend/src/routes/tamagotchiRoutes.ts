import { Router } from "express";
import {
  createTamagotchi,
  deleteTamagotchi,
  getAllTamagotchis,
  getOneTamagotchi,
  careTamagotchi,
} from "../controllers/tamagotchiController";

const router = Router();

router.route("/").get(getAllTamagotchis).post(createTamagotchi);

router.route("/:id").get(getOneTamagotchi).delete(deleteTamagotchi);

router.route("/:id/:careAction").patch(careTamagotchi);

export default router;
