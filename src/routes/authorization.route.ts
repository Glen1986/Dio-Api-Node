import {NextFunction, Request, Response, Router} from "express";
import ForbiddenError from "../models/errors/forbidden.error.models";

const authorizationRouter = Router();

authorizationRouter.post('/token', (req: Request, res:  Response, next: NextFunction) => {
  try {
  const authorizationHeader = req.headers['authorization']
  if(!authorizationHeader){
    throw new ForbiddenError("no permitido")
  }
    const [authenticatonType, token] = authorizationHeader.split(" ")
    if(authenticatonType !== 'Basic' || !token){
      throw new ForbiddenError('no credentials')
    }
    const tokenContent = Buffer.from(token, 'base64').toString('utf-8')
    const [username, password] = tokenContent.split(':')
    if(!username || !password){
      throw new ForbiddenError('no credentials')
    }
    console.log(username, password)
    
  } catch (e) {
    /* handle error */
    next(e)
  }
})
export default authorizationRouter;
