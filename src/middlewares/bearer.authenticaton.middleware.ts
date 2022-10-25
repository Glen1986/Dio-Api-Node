import {NextFunction, Request, Response} from "express"
import JWT from "jsonwebtoken"
import ForbiddenError from "../models/errors/forbidden.error.models"

export default function bearerAuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {
  try{
     const authorizationHeader = req.headers['authorization']

     if(!authorizationHeader){
       throw new ForbiddenError('no valid token')
     }

     const[authenticatonType, token] = authorizationHeader.split(' ')

     if( authenticatonType !== 'Bearer' || !token) {
       throw new ForbiddenError('no valid token')
     }

     const tokenPayload = JWT.verify(token, 'my_secret_key')

     if(typeof tokenPayload !== 'object' || !tokenPayload.sub) {
       throw new ForbiddenError('no valid token')
     }

     const user = {
             uuid : tokenPayload.sub,
             username: tokenPayload.username
         };
     req.user = user
    next()
  }catch(e){
    next(e)
  }
} 
