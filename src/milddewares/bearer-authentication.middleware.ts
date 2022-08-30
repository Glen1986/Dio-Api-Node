import {NextFunction, Request, Response} from "express";
import  JWT from 'jsonwebtoken'
import ForbidemError from "../models/errors/forbidem.error.model";
// import userRepository from "../repositories/user.repository";

async function bearerAuthentiationMiddleware(req: Request, res:Response, next: NextFunction){
    try {
        const authorizationHeader = req.headers['authorization'];

        if(!authorizationHeader){
            throw new ForbidemError('no credentials Token');
        }
        const [authenticationType, token] = authorizationHeader.split(' ');

        if (authenticationType !== 'Bearer' || !token) {
            throw new ForbidemError('Token de authenticação inválido');
        }
        const tokenPayload = JWT.verify(token, 'my_secret_key');

        if( typeof tokenPayload !== 'object' || !tokenPayload.sub ){
            throw new ForbidemError('invalid token error')
        }
        const user = {
            uuid : tokenPayload.sub,
            username: tokenPayload.username
        };
        req.user = user

        next();
    } catch (e) {
        next(e)
        /* handle error */
    }
}

export default bearerAuthentiationMiddleware
