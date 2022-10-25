import {NextFunction, Request, Response, Router} from "express";
import JWT from "jsonwebtoken";
import {StatusCodes} from "http-status-codes";
import basicAuthenticationMiddleware from "../middlewares/basic-authentication.middleware";
import ForbiddenError from "../models/errors/forbidden.error.models";


const authorizationRoute = Router();

authorizationRoute.post('/token', basicAuthenticationMiddleware, async (req: Request, res:  Response, next: NextFunction) => {
  try {
    const user = req.user

    if(!user){
      throw new ForbiddenError('usuario no informado')
    }


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
