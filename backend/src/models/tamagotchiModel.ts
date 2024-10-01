import mongoose from "mongoose";
import {
  Environment,
  Maintenance,
  Plant,
  Tamagotchi,
  Weather,
} from "../types/tamagotchi";

// First do the tamagotchi part only
// TAMAGOCTHI: post routes to water, clean, fertilize
// then the cronjob, that decreases things over time and recalculates the health status
// TECHDEBT: handler factory
// TECHDEBT: error handling
// TECHDEBT: security middlewares
// Draft the mental health growth and decay structure (what questions will be asked? and these questions should be tied to the user? Or the plant?, because you should be able to transfer the plant )
// then setup the next.js pwa
// then dive into the three.js part
// then the backend safety part & protect the routes

const maintenanceSchema = new mongoose.Schema({
  water: {
    type: Number,
    default: 50, // Default hydration level
    min: 0,
    max: 100,
  },
  clean: {
    type: Number,
    default: 50, // Default cleanliness level
    min: 0,
    max: 100,
  },
  fertilize: {
    type: Number,
    default: 50, // Default fertilizing level
    min: 0,
    max: 100,
  },
});

const tamagotchiSchema = new mongoose.Schema<Tamagotchi>(
  {
    //   "user_id": "user_id",
    //   "branches": [
    //     {
    //       "length": 0.5,         // Length of this branch
    //       "radius": 0.03,        // Thickness of this branch
    //       "angle": 45,           // Angle at which the branch grows relative to the stem
    //       "position": [0.2, 0.5, 0], // Where the branch starts on the stem [x, y, z]
    //       "leaves": [
    //         {
    //           "size": 0.3,       // Size of the leaf
    //           "position": [0.2, 0.7, 0], // Position of the leaf on the branch
    //           "rotation": [0, 45, 0],    // Rotation of the leaf
    //           "color": "#00FF00"  // Color of the leaf (changes if decaying)
    //         }
    //       ]
    //     }
    //   ],
    name: {
      type: String,
      required: [true, "A plant must have a name"],
      maxLength: [20, "Must have less or equal than 20 characters"],
      minLength: [10, "Must have more or equal than 4 characters"],
    },
    plant_type: {
      type: String,
      required: [true, "A plant must have a type"],
      enum: {
        values: Object.values(Plant),
        message: "Plant type is either: Bonsai, Monsterra, or Cactus",
      },
    },
    environment: {
      type: String,
      required: [true, "A plant must have an environment"],
      enum: {
        values: Object.values(Environment),
        message: "Environment is either: neo_tokyo, calm_city, lofi_europe",
      },
    },
    weather_condition: {
      type: String,
      required: [true, "A plant must have a weather condition"],
      enum: {
        values: Object.values(Weather),
        message: "Weather condition is either: sunny, rainy, cloudy",
      },
    },
    growth_stage: {
      type: Number,
      default: 0,
      min: [0, "Growth stage must be above 0"],
      max: [100, "Growth stage must be below 100"],
    },
    health: {
      type: Number,
      default: 50,
      min: 0,
      max: 100,
    },
    // maintenace alone keeps the tamagotchi alive, but it is the mental health that makes it grow combined with health status
    // e.g. when mental health is low, the plant will not grow much, but if it is high, it will grow faster
    // you can always export it as NFT but at that moment it gets frozen :) and sell it - there are 3 (plant type) * 3 (backgrounds) * day/night time (2) * weather (3) * growth stages (100)= 2700 possible combinations

    // maybe not tell the user so much, what to do, to overwater it...
    // let them get a feeling for it
    maintenance: {
      // in the futures, we can add sunlight and sunspot
      // e.g. some plants need more sunlight than others
      // we connect it to the weather API to geht the current weather, when it is too sunny, it impacts health
      // you can help a little by moving the plant to left or right (shadow or light)
      type: maintenanceSchema, // Use the embedded maintenance schema
      required: true,
      default: () => ({ water: 50, clean: 50, fertilize: 50 }), // Ensure default values
    },
    last_updated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// tamagotchiSchema.virtual("durationWeeks").get(function () {
//   return this.duration / 7;
// }); // can be done in the controller as well, but inside controllers, we want als little business logic as possible

// virtual populate
// tamagotchiSchema.virtual("reviews", {
//   ref: "Review",
//   foreignField: "tour",
//   localField: "_id",
// });

// DOCUMENT middlware: runs before .save() and .create() remove() or validate()
tamagotchiSchema.pre("save", function (next) {
  next();
});

// embedding
// tourSchema.post('save', async function (doc, next) {
//   const guidesPromises = this.guides.map(async (userId) =>
//     User.findById(userId),
//   );
//   this.guides = await Promise.all(guidesPromises);
//   next();
// });

// QUERY middleware
// tamagotchiSchema.pre(/^find/, function (next) {
//   // regex so that it runs on all find methods, "findOne" too, not only "find"
//   this.find({ secretTour: { $ne: true } });
//   this.start = Date.now();
//   next();
// });

// AGGREGATION middleware
// tamagotchiSchema.pre("aggregate", function (next) {
//   this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
//   console.log(this.pipeline());
//   next();
// });

const Tamagotchi = mongoose.model("Tamagotchi", tamagotchiSchema);
export default Tamagotchi;

// {
//   "_id": "unique_plant_id",
//   "user_id": "user_id",
//   "plant_type": "Monsterra",
//   "growth_stage": 45,
//   "stem": {
//     "height": 1.2,           // Height of the main stem
//     "radius": 0.05           // Thickness of the stem
//   },
//   "branches": [
//     {
//       "length": 0.5,         // Length of this branch
//       "radius": 0.03,        // Thickness of this branch
//       "angle": 45,           // Angle at which the branch grows relative to the stem
//       "position": [0.2, 0.5, 0], // Where the branch starts on the stem [x, y, z]
//       "leaves": [
//         {
//           "size": 0.3,       // Size of the leaf
//           "position": [0.2, 0.7, 0], // Position of the leaf on the branch
//           "rotation": [0, 45, 0],    // Rotation of the leaf
//           "color": "#00FF00"  // Color of the leaf (changes if decaying)
//         }
//       ]
//     }
//   ],
//   "health_status": "Healthy",
//   "next_watering_time": "2024-09-27T10:00:00Z",
//   "random_seed": 12345678,
//   "environment": "Neo Tokyo",
//   "weather_condition": "Cloudy",
//   "last_updated": "2024-09-26T15:30:00Z"
// }
