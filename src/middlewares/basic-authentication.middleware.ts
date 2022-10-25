import {NextFunction, Request, Response} from "express";
import ForbiddenError from "../models/errors/forbidden.error.models";
import userRepository from "../repositories/user.repository";

export default async function basicAuthenticationMiddleware ( req: Request, res:Response, next: NextFunction ){
  try {
   const authorizationHeader = req.headers['authorization']
  
  if(!authorizationHeader){
    throw new ForbiddenError ("no permitido")
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

    const user = await userRepository.findByUsernameAndPassword(username, password)
    if(!user){
      throw new ForbiddenError('usuario no informado')
    }
        if(!user){
      throw new ForbiddenError('no user')
        };
        // console.log(user)
      req.user = user;
   next()
  } catch (e) {
    /* handle error */
    next(e)
  }

}
   /***
     "iss" dominio de aplicaion generadora de tokken
     "sub" asunto del token, utilizado para guardar el ID
     "aud" define quien puede usar el token
     "exp" fecha de expiracion del token
     "nbf" fecha de validacion del token
     "iat" fecha de creacion del token
     "jti" ID de token
   * ***/

