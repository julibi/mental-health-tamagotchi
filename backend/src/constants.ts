import { CareAction } from "./types/actions";
import { Plant } from "./types/tamagotchi";

// decay rates per DAY
const careDecayRates = {
  [Plant.BONSAI]: {
    [CareAction.WATER]: 1, // Points decay 1 point per hour/day
    [CareAction.CLEAN]: 0.5,
    [CareAction.FERTILIZE]: 0.2,
  },
  [Plant.MONSTERRA]: {
    [CareAction.WATER]: 0.7,
    [CareAction.CLEAN]: 0.3,
    [CareAction.FERTILIZE]: 0.15,
  },
  [Plant.CACTUS]: {
    [CareAction.WATER]: 0.2,
    [CareAction.CLEAN]: 0.1,
    [CareAction.FERTILIZE]: 0.05,
  },
};

const penaltyThresholds = {
  [Plant.BONSAI]: {
    [CareAction.WATER]: {
      min: 60,
      max: 80,
    },
    [CareAction.CLEAN]: {
      min: 40,
      max: 100,
    },
    [CareAction.FERTILIZE]: {
      min: 60,
      max: 90,
    },
  },
  [Plant.MONSTERRA]: {
    [CareAction.WATER]: {
      min: 30,
      max: 70,
    },
    [CareAction.CLEAN]: {
      min: 20,
      max: 100,
    },
    [CareAction.FERTILIZE]: {
      min: 20,
      max: 50,
    },
  },
  [Plant.CACTUS]: {
    [CareAction.WATER]: {
      min: 10,
      max: 40,
    },
    [CareAction.CLEAN]: {
      min: 10,
      max: 30,
    },
    [CareAction.FERTILIZE]: {
      min: 10,
      max: 20,
    },
  },
};

// multiplies for deducting points
const penaltyMultipliers = {
  [CareAction.WATER]: 0.5,
  [CareAction.CLEAN]: 0.2,
  [CareAction.FERTILIZE]: 0.4,
};

const rewardPoints = {
  [CareAction.WATER]: 3,
  [CareAction.CLEAN]: 5,
  [CareAction.FERTILIZE]: 2,
};

const healthMapping = {
  0: "dead",
  40: "bad",
  60: "okay",
  80: "good",
  100: "very good",
};

const careActionIncrements = {
  [CareAction.WATER]: 3,
  [CareAction.CLEAN]: 5,
  [CareAction.FERTILIZE]: 10,
};

const careMaxValue = 100;

export {
  careActionIncrements,
  careDecayRates,
  careMaxValue,
  healthMapping,
  penaltyThresholds,
  penaltyMultipliers,
  rewardPoints,
};
