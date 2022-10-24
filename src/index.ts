import express, { Request, Response, NextFunction, urlencoded } from "express";
import usersRoute from "./routes/users.route";
import statusRoute from "./routes/status.route"
import errorHandler from "./middlewares/error-Handler.middleware";

const app = express();

//configuracion de nuestra appliation
app.use(express.json());
app.use(urlencoded({extended: true}));

//rutas de nuestra App
app.use(usersRoute);
app.use(statusRoute)

//error handler
app.use(errorHandler)



app.listen(3000, () => {
  console.log("3000 port aplication executing");
});
// console.log("types");
