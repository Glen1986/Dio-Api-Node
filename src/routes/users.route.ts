import { Request, Response, NextFunction, Router} from "express";
import {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} from 'http-status-codes';const usersRoute = Router();

usersRoute.get('/users', (req: Request, res: Response, next: NextFunction) => {
  const users = [{userName:'Glen'}]
  res.status(StatusCodes.OK).send(users).send(ReasonPhrases.OK)
})

usersRoute.get('/users/:uuid', (req: Request<{uuid: string}>, res: Response, next: NextFunction) => {
  const uuid = req.params.uuid;
  res.status(StatusCodes.OK).send({uuid}).send(ReasonPhrases.OK)
})
export default usersRoute;


