import { Request, Response, NextFunction, Router} from "express";
import {ReasonPhrases, StatusCodes} from 'http-status-codes';
import userRepository from "../repositories/user.repository";

const usersRoute = Router();

const usuarios = []


usersRoute.get('/users', async (req: Request, res: Response, next: NextFunction) => {
  const users = await userRepository.findAllUsers()
  res.status(StatusCodes.OK).send(users).send(ReasonPhrases.OK)
})

usersRoute.get('/users/:uuid', (req: Request<{uuid: string}>, res: Response, next: NextFunction) => {
  const uuid = req.params.uuid;
  res.status(StatusCodes.OK).send({uuid}).send(ReasonPhrases.OK)
})

usersRoute.post('/users', async (req: Request, res: Response, next: NextFunction) => {
  const newUser = req.body
  // const users = userRepository.findAllUsers()
  // users.push(newUser)
  console.log(newUser);
  
  res.status(StatusCodes.CREATED).send({newUser}).send(ReasonPhrases.OK)
})

usersRoute.put('/users/:uuid', (req: Request<{uuid: string}>, res: Response, next:NextFunction) => {
  const uuid = req.params.uuid;
  const modifiedUser = req.body;
  modifiedUser.uuid = uuid;
  const myUser = usuarios.find(usuario => usuario.uuid === uuid)
  console.log({myUser, modifiedUser});
  res.status(StatusCodes.OK).send({modifiedUser}).send({uuid}).send(ReasonPhrases.OK)
})


usersRoute.delete('/users/:uuid', (req: Request<{uuid: string}>, res: Response, next:NextFunction) => {
  const uuid = req.params.uuid;
  res.status(StatusCodes.OK).send({uuid}).send(ReasonPhrases.OK)
})

export default usersRoute;


