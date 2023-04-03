import isAuthenticated from "@modules/users/middlewares/isAuthenticated";
import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";
import VoiceActorController from "../controllers/VoiceActorController";

const actorsRouter = Router();
const actorsController = new VoiceActorController();

actorsRouter.use(isAuthenticated);

actorsRouter.get("/", actorsController.index);

actorsRouter.get(
  "/:id",
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  actorsController.show
);

actorsRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      website: Joi.string().required(),
    },
  }),
  actorsController.create
);

actorsRouter.put(
  "/:id",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      website: Joi.string().required(),
    },
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
  }),
  actorsController.update
);

actorsRouter.delete(
  "/:id",
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  actorsController.delete
);

export default actorsRouter;
