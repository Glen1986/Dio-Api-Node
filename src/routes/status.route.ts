
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { Request, Response, NextFunction, Router} from "express";
import {ReasonPhrases, StatusCodes} from 'http-status-codes';

const statusRoute = Router();

statusRoute.get('/status', (req: Request, res: Response, next: NextFunction) => {
   res.status(StatusCodes.OK).send(ReasonPhrases.OK)
 })

export default statusRoute;

