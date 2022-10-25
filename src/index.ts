import express, { urlencoded } from "express";
import usersRoute from "./routes/users.route";
import statusRoute from "./routes/status.route"
import errorHandler from "./middlewares/error-Handler.middleware";
import authorizationRoute from "./routes/authorization.route";

const app = express();

//configuracion de nuestra appliation
app.use(express.json());
app.use(urlencoded({extended: true}));

//rutas de nuestra App
app.use(statusRoute)
app.use( usersRoute);
app.use(authorizationRoute)

//error handler
app.use(errorHandler)

app.listen(3000, () => {
  console.log("3000 port aplication executing");
});
