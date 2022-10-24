
import { NextFunction, Request, Response, Router } from 'express';
import ForbidemError from '../models/errors/forbidden.error.model';
// import { StatusCodes } from 'http-status-codes';
// import JWT from 'jsonwebtoken';
// import basicAuthenticationMiddleware from '../milddewares/basic-authentication.middleware';
// import ForbidemError from '../models/errors/forbidem.error.model';
//

    const authorizationRoute = Router();

    authorizationRoute.post('/token',/** basicAuthenticationMiddleware, async**/ (req: Request, res: Response, next: NextFunction) => {
       
try {
     const authorizationHeader = req.headers['authorization']
     
        if(!authorizationHeader){
            throw new ForbidemError("Cedenciales no informadas")
        }
        const user = req.user;

        if (!user) {
            throw new ForbidemError('Usuário não informado!');
        }

        // const jwtPayload = { username: user.username };
        // const jwtOptions = { subject: user?.uuid };
        // const secretKey = 'my_secret_key';

        // const jwt = JWT.sign(jwtPayload, secretKey, jwtOptions);

        // res.status(StatusCodes.OK).json({ token: jwt });
    } catch (error) {
        next(error);
    }
});


export default authorizationRoute;

