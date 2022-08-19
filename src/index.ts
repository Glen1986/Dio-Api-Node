// import express, { Request, Response, NextFunction } from "express";
import express from 'express'
import usersRoute from './routes/users.route';
import statusRoute from './routes/status.route';
import errorHandler from './milddewares/error-handler.middleware';


const app = express();

//app config
app.use(express.json());
app.use(express.urlencoded({extended: true}))

//routes config
app.use(usersRoute);
app.use(statusRoute);

//error config
app.use(errorHandler);

app.listen(3000, ()=> {
   console.log('executing app at 3000 port');
})

