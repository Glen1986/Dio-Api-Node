// import express, { Request, Response, NextFunction } from "express";
import express from 'express'
import errorHandler from './milddewares/error-handler.middleware';
import authorizationRoute from './routes/authorization.route';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';

const app = express();

//app config
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//routes config
app.use(statusRoute);
app.use(usersRoute);
app.use(authorizationRoute);

//error config
app.use(errorHandler);

app.listen(3000, ()=> {
   console.log('executing app at 3000 port');
})

