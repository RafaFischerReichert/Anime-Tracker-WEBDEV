import animeRouter from "@modules/anime/routes/anime.routes";
import { Router } from "express";

const routes = Router();

routes.use("/anime", animeRouter);
routes.get("/", (request, response) => {
  return response.json({ message: "Hello Dev!" });
});

export default routes;
