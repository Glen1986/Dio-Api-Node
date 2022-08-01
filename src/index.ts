import { Request, Response, NextFunction } from 'express';
import express from 'express'

const app = express()

app.get('/status', (req:Request, res:Response, next:NextFunction)=> {
  res.status(200).send({foo:'bar'})
})

app.listen(3000, ()=>{
  console.log('executing appliction at 3000 port');
  
})

console.log('typescript');

