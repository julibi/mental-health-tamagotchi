import { Request, Response, NextFunction } from "express";
import { Model } from "mongoose";
import catchAsync from "../utils/catchAsync";

const deleteOne = (Model: Model<any>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const document = await Model.findByIdAndDelete(req.params.id);

    if (!document) {
      return res.status(404).json({
        status: "fail",
        message: "No document found with that ID",
      });
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });

export { deleteOne };
