import { NextFunction, Request, Response } from "express";
import ForbidemError from "../models/errors/forbidem.error.model";
import userRepository from "../repositories/user.repository";

async function basicAuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authorizationHeader = req.headers['authorization'];

        if (!authorizationHeader) {
            throw new ForbidemError('Credenciais não informadas');
        }

        const [authenticationType, token] = authorizationHeader.split(' ');

        if (authenticationType !== 'Basic' || !token) {
            throw new ForbidemError('Tipo de authenticação inválido');
        }

        const tokenContent = Buffer.from(token, 'base64').toString('utf-8');

        const [username, password] = tokenContent.split(':');

        if (!username || !password) {
            throw new ForbidemError('Credenciais não preenchidas');
        }

        const user = await userRepository.findByUsernameAndPassword(username, password);
        
        if (!user) {
            throw new ForbidemError('Usuário ou senha inválidos!');
        }

        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}

export default basicAuthenticationMiddleware;
