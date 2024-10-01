import {
  penaltyMultipliers,
  penaltyThresholds,
  rewardPoints,
} from "../constants";
import { CareAction } from "../types/actions";
import { Plant } from "../types/tamagotchi";
import TamagotchiModel from "../models/tamagotchiModel";

/**
 * Utility function to update care points (watering, fertilizing, cleaning)
 * and calculate the health of the plant based on thresholds and multipliers.
 *
 * @param plant - The plant object
 * @param careType - The type of care ("water", "clean", "fertilize")
 */
const updateHealthAfterCare = (
  plant: TamagotchiModel,
  careType: CareAction
) => {
  // Get the specific plant type and care thresholds
  const plantType = plant.plant_type;
  const careThreshold = penaltyThresholds[plantType as Plant][careType];
  const carePoints = plant.maintenance[careType];
  let healthModifier = 0;

  // 1. Health Improvements: If within optimal range, reward health points
  if (carePoints >= careThreshold.min && carePoints <= careThreshold.max) {
    console.log("getting rewards!");
    healthModifier += rewardPoints[careType]; // Reward points
  }

  // 2. Health Penalties: If care points are below or above optimal thresholds
  if (carePoints < careThreshold.min) {
    console.log("too little! penalize!");
    // Penalize for under-care
    healthModifier -=
      (careThreshold.min - carePoints) * penaltyMultipliers[careType];
  } else if (carePoints > careThreshold.max) {
    console.log("too much! penalize!");
    // Penalize for over-care (e.g., overwatering or overfertilizing)
    healthModifier -=
      (carePoints - careThreshold.max) * penaltyMultipliers[careType];
  }

  // Update the plant's health, ensuring it stays within 0-100
  plant.health = Math.max(0, Math.min(100, plant.health + healthModifier));

  console.log("new health: ", plant.health);

  // Return the modified plant object for saving
  return plant;
};

export default updateHealthAfterCare;
