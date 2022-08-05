import express, { Request, Response, NextFunction } from "express";
import usersRoute from './routes/users.route';
import statusRoute from './routes/status.route';


const app = express();

app.use(express.json());

app.use(usersRoute);
app.use(statusRoute);


app.listen(3000, ()=> {
   console.log('executing app at 3000 port');
})

