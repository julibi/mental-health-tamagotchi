import { Document } from "mongoose";
import { CareAction } from "./actions";
import { Environment, Weather } from "./environment";

enum Plant {
  BONSAI = "bonsai",
  MONSTERRA = "monsterra",
  CACTUS = "cactus",
}

enum Health {
  HEALTHY = "healthy",
  SICK = "sick",
  DEAD = "dead",
}

type Maintenance = {
  [CareAction.WATER]: number; // Hydration level of the plant
  [CareAction.CLEAN]: number; // Cleanliness level of the plant
  [CareAction.FERTILIZE]: number; // Fertilization level of the plant
};

interface Tamagotchi extends Document {
  name: string;
  plant_type: Plant;
  environment: Environment;
  weather_condition: Weather;
  growth_stage: number;
  health: number;
  maintenance: Maintenance;
  last_updated: Date;
}

export { Plant, Environment, Health, Maintenance, Tamagotchi, Weather };
