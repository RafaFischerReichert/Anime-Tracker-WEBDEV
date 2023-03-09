import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import AnimeController from "../controllers/AnimeController";

const animeRouter = Router();
const animeController = new AnimeController();

animeRouter.get("/", animeController.index);
animeRouter.get(
  "/:id",
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  animeController.show
);
animeRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      year: Joi.string().length(4).required(),
      genre: Joi.string().required(),
      started: Joi.bool().required(),
      finished: Joi.bool().required(),
      rating: Joi.number().min(0).max(10).required(),
    },
  }),
  animeController.create
);
animeRouter.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      title: Joi.string().required(),
      year: Joi.string().length(4).required(),
      genre: Joi.string().required(),
      started: Joi.bool().required(),
      finished: Joi.bool().required(),
      rating: Joi.number().min(0).max(10).required(),
    },
  }),
  animeController.update
);
animeRouter.delete(
  "/:id",
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  animeController.delete
);

export default animeRouter;
