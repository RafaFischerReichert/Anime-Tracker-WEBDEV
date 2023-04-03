import { Router } from "express";
import CharactersController from "../controller/CharacterController";
import isAuthenticated from "@modules/users/middlewares/isAuthenticated";
import { Segments, celebrate } from "celebrate";
import Joi from "joi";

const charactersRouter = Router();
const charsController = new CharactersController();

charactersRouter.use(isAuthenticated);
charactersRouter.get(
  ":/id",
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  charsController.show
);

charactersRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      actor_id: Joi.string().required(),
      anime: Joi.required(),
    },
  }),
  charsController.create
);

export default charactersRouter;
