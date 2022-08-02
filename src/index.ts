import { Request, Response, NextFunction } from 'express';
import express from 'express'
import usersRoute from './routes/users.route';

const app = express()

app.use(usersRoute);
   app.get('/status', (req: Request, res: Response, next: NextFunction)=> {
   res.status(200).send({foo:'excelente'})
 })
app.listen(3000, ()=>{
   console.log('executing app at 3000 port');
   
})

