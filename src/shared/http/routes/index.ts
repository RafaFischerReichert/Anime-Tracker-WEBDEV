import animeRouter from "@modules/anime/routes/anime.routes";
import passwordRouter from "@modules/users/routes/password.routes";
import profileRouter from "@modules/users/routes/profile.routes";
import sessionsRouter from "@modules/users/routes/session.routes";
import usersRouter from "@modules/users/routes/users.routes";
import actorsRouter from "@modules/voice_actors/routes/actor.routes";
import { Router } from "express";

const routes = Router();

routes.use("/anime", animeRouter);
routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/password", passwordRouter);
routes.use("/profile", profileRouter);
routes.use("/actors", actorsRouter);

export default routes;
