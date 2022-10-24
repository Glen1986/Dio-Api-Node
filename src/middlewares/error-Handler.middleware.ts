
import {Request, Response, NextFunction} from 'express'
import { StatusCodes } from 'http-status-codes';
import DatabaseError from '../models/errors/database.error.model';
import ForbiddenError from '../models/errors/forbidden.error.models';

function errorHandler(e: any, req: Request, res: Response, next: NextFunction){
    if(e instanceof DatabaseError){
      res.sendStatus(StatusCodes.BAD_REQUEST);       
    }else if(e instanceof ForbiddenError){
      res.sendStatus(StatusCodes.FORBIDDEN)
    }else{
      res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);       
    }
 
}
export default errorHandler;
