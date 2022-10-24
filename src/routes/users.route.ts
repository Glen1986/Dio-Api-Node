import { Request, Response, NextFunction, Router} from "express";
import {ReasonPhrases, StatusCodes} from 'http-status-codes';
import userRepository from "../repositories/user.repository";

const usersRoute = Router();



usersRoute.get('/users', async (req: Request, res: Response, next: NextFunction) => {
  try {
  const users = await userRepository.findAllUsers()
  res.status(StatusCodes.OK).send(users).send(ReasonPhrases.OK)  
  } catch (e) {
    /* handle error */
    next(e)
  }
  
});

usersRoute.get('/users/:uuid', async (req: Request<{uuid: string}>, res: Response, next: NextFunction) => {
  try {
      console.log(req.headers['authorization']);

    const uuid = req.params.uuid;
    const user = await userRepository.findUserById(uuid);
    res.status(StatusCodes.OK).send(user).send(ReasonPhrases.OK)
   
  } catch (e) {
    /* handle error */
    next(e);
  }
});

usersRoute.put('/users/:uuid', async (req: Request<{uuid: string}>, res: Response, next:NextFunction) => {
  const uuid = req.params.uuid;
  const modifiedUser = req.body;
  modifiedUser.uuid = uuid
  await userRepository.update(modifiedUser)
  res.status(StatusCodes.OK).send(uuid).send(ReasonPhrases.OK)
});

usersRoute.delete('/users/:uuid', async (req:Request<{uuid: string}>, res:Response, net: NextFunction)=>{
  const uuid = req.params.uuid;
  await userRepository.remove(uuid);
  // res.sendStatus(StatusCodes.OK);
  res.status(StatusCodes.OK).send().send(ReasonPhrases.OK)
})

export default usersRoute;



