import animeRouter from "@modules/anime/routes/anime.routes";
import sessionsRouter from "@modules/users/routes/session.routes";
import usersRouter from "@modules/users/routes/users.routes";
import { Router } from "express";

const routes = Router();

routes.use("/anime", animeRouter);
routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.get("/", (request, response) => {
  return response.json({ message: "Hello Dev!" });
});

export default routes;
