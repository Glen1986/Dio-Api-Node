import express, { Request, Response, NextFunction, urlencoded } from "express";
import usersRoute from "./routes/users.route";
import statusRoute from "./routes/status.route"
import errorHandler from "./middlewares/error-Handler.middleware";
import authorizationRoute from "./routes/authorization.route";
import basicAuthenticationMiddleware from "./middlewares/basic-authentication.middleware";

const app = express();

//configuracion de nuestra appliation
app.use(express.json());
app.use(urlencoded({extended: true}));

//rutas de nuestra App
app.use(usersRoute);
app.use(statusRoute)
app.use(authorizationRoute)

//error handler
app.use(errorHandler)




app.listen(3000, () => {
  console.log("3000 port aplication executing");
});
// console.log("types");
