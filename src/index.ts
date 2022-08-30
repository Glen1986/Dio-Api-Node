// import express, { Request, Response, NextFunction } from "express";
import express from 'express'
import bearerAuthenticationMiddleware from './milddewares/bearer-authentication.middleware';
import authorizationRoute from './routes/authorization.route';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';

import errorHandler from './milddewares/error-handler.middleware';

const app = express();

//app config
app.use(express.json());
app.use(express.urlencoded({extended: true}));

{/*routes config*/}
app.use(statusRoute);
app.use(bearerAuthenticationMiddleware, usersRoute);
app.use(authorizationRoute);

{/*error config*/}
app.use(errorHandler);

app.listen(3000, ()=> {
   console.log('executing app at 3000 port');
})

