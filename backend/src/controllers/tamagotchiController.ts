import { NextFunction, Request, Response } from "express";
import Tamagotchi from "../models/tamagotchiModel";
import { deleteOne } from "./handlerFactory";
import catchAsync from "../utils/catchAsync";
import { careActionIncrements, careMaxValue } from "../constants";
import { CareAction } from "../types/actions";
import updateHealthAfterCare from "../utils/updateHealthAfterCare";

const getAllTamagotchis = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tamagotchis = await Tamagotchi.find();

    res.status(200).json({
      status: "success",
      results: tamagotchis.length,
      data: {
        tamagotchis,
      },
    });
  } catch (error) {
    console.log({ error });

    res.status(500).json({
      status: "fail",
      message: "Internal server error",
    });
  }
};

const getOneTamagotchi = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log({ req, res, next });
  res.status(200).json({
    status: "success",
    data: {
      tamagochis: {},
    },
  });
};

const createTamagotchi = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    name,
    plant_type,
    environment,
    weather_condition,
    growth_stage,
    stem,
    health,
    maintenance,
  } = req.body;

  try {
    const tamagotchi = await Tamagotchi.create({
      name,
      plant_type,
      environment,
      weather_condition,
      growth_stage,
      stem,
      health,
      maintenance,
      last_updated: Date.now(),
    });

    if (!name || !plant_type || !environment || !weather_condition) {
      return res.status(400).json({
        status: "fail",
        message: "Missing required fields",
      });
    }

    return res.status(201).json({
      status: "success",
      data: {
        tamagotchi,
      },
    });
  } catch (error) {
    console.log({ error });

    res.status(500).json({
      status: "fail",
      message: "Internal server error",
    });
  }
};

const deleteTamagotchi = deleteOne(Tamagotchi);

const careTamagotchi = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id, careAction } = req.params;
    let plant = await Tamagotchi.findById(id);

    // Validate
    if (!plant) {
      return res.status(404).json({ message: "Plant not found" });
    }
    if (!careAction) {
      return res.status(400).json({ message: "Care action is required" });
    }
    if (!Object.values(CareAction).includes(careAction as CareAction)) {
      return res.status(400).json({ message: "Invalid care action" });
    }
    if (plant.health === 0) {
      return res.status(400).json({ message: "Plant is dead" });
    }
    if (
      plant.maintenance[careAction as CareAction] >=
      // 100 - 3 + 1 = 98
      careMaxValue - careActionIncrements[careAction as CareAction] + 1
    ) {
      return res.status(400).json({
        message: "Plant is overwatered",
      });
    }

    plant.maintenance[careAction as CareAction] +=
      careActionIncrements[careAction as CareAction];

    // Optionally update the last watered time (if required)
    plant.last_updated = new Date();

    // Update the health of the plant based on the new watering points
    updateHealthAfterCare(plant, careAction as CareAction);

    // Save the updated plant data
    await plant.save();

    // Respond with the updated plant data
    res.json({
      message: "Plant watered successfully!",
      plant,
    });
  }
);

export {
  createTamagotchi,
  deleteTamagotchi,
  getAllTamagotchis,
  getOneTamagotchi,
  careTamagotchi,
};
