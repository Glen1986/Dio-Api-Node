import express, { Request, Response, NextFunction, urlencoded } from "express";
import usersRoute from "./routes/users.route";
import statusRoute from "./routes/status.route"
import errorHandler from "./middlewares/error-Handler.middleware";
import authorizationRouter from "./routes/authorization.route";

const app = express();

//configuracion de nuestra appliation
app.use(express.json());
app.use(urlencoded({extended: true}));

//rutas de nuestra App
app.use(usersRoute);
app.use(statusRoute)
app.use(authorizationRouter)

//error handler
app.use(errorHandler)




app.listen(3000, () => {
  console.log("3000 port aplication executing");
});
// console.log("types");
