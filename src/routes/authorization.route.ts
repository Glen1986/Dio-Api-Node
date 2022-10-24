import {NextFunction, Request, Response, Router} from "express";
import ForbiddenError from "../models/errors/forbidden.error.models";
import userRepository from "../repositories/user.repository";
import JWT from "jsonwebtoken";
import {StatusCodes} from "http-status-codes";


const authorizationRoute = Router();

authorizationRoute.post('/token', async (req: Request, res:  Response, next: NextFunction) => {
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
//
    // console.log(username, password)
    const user = await userRepository.findByUsernameAndPassword(username, password)
    console.log(user)
   /***
     "iss" dominio de aplicaion generadora de tokken
     "sub" asunto del token, utilizado para guardar el ID
     "aud" define quien puede usar el token
     "exp" fecha de expiracion del token
     "nbf" fecha de validacion del token
     "iat" fecha de creacion del token
     "jti" ID de token
   * ***/
        if(!user){
      throw new ForbiddenError('no user')
        };

    const jwtPayload = { username: user.username };
    const jwtOptions = { subject: user?.uuid };
    const secretKey = 'my_secret_key';
    const jwt = JWT.sign( jwtPayload, secretKey, jwtOptions );
    res.status(StatusCodes.OK).json({ token: jwt })


  } catch (e) {
    /* handle error */
    next(e)
  }
})
export default authorizationRoute;
