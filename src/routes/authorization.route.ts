import {NextFunction, Request, Response, Router} from "express";
import JWT from "jsonwebtoken";
import {StatusCodes} from "http-status-codes";
import basicAuthenticationMiddleware from "../middlewares/basic-authentication.middleware";
import ForbiddenError from "../models/errors/forbidden.error.models";
import jwtAuthenticationMiddleware from "../middlewares/jwt.authenticaton.middleware";

const authorizationRoute = Router();

authorizationRoute.post('/token', basicAuthenticationMiddleware, async (req: Request, res:  Response, next: NextFunction) => {
  try {
    const user = req.user

    if(!user){
      throw new ForbiddenError('usuario no informado')
    }

    const jwtPayload = { username: user.username };
    const jwtOptions = { subject: user?.uuid };
    const secretKey = 'my_secret_key';

    const jwt = JWT.sign( jwtPayload, secretKey, jwtOptions );
    res.status(StatusCodes.OK).json({ token: jwt })
console.log(user)
  } catch (e) {
    /* handle error */
    next(e)
  }
})
authorizationRoute.post('/token/validate',jwtAuthenticationMiddleware, async (req: Request, res:  Response, next: NextFunction) => {
  res.sendStatus(StatusCodes.OK).send()
})
export default authorizationRoute;
   /***
     "iss" dominio de aplicaion generadora de tokken
     "sub" asunto del token, utilizado para guardar el ID
     "aud" define quien puede usar el token
     "exp" fecha de expiracion del token
     "nbf" fecha de validacion del token
     "iat" fecha de creacion del token
     "jti" ID de token
   * ***/
