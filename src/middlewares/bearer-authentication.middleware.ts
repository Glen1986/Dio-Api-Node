import {NextFunction, Request, Response} from "express";
import JWT from 'jsonwebtoken';
import ForbiddenError from "../models/errors/forbidden.error.models";
import userRepository from "../repositories/user.repository";

export default async function bearerAuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
   
  const authorizationHeader = req.headers['authorization'];

  if(!authorizationHeader){
    throw new ForbiddenError('no credentials');
    } 
    const [authenticatonType, token] = authorizationHeader.split(" ")

    if(authenticatonType !== 'Bearer' || !token){
      throw new ForbiddenError('no crerdentials')
    }
    const tokenPayload = JWT.verify(token, 'my_secret_key')

    if(typeof tokenPayload !== 'object' || !tokenPayload.sub){
      throw new ForbiddenError('invalida token')
    }

    const uuid = tokenPayload.sub; 
    // const user = await userRepository.findUsersById(uuid)
    const user = {
      username: tokenPayload.username,
      uuid: tokenPayload.sub
    }
    req.user = user;
    // console.log(...user)
    console.log(user)
    next()
  } catch (e) {
    /* handle error */
    next(e)
  }

}
