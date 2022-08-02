import { Request, Response, NextFunction, Router} from "express";

const usersRoute = Router();
// get /users
//
// get /users/:uuid
//
// post /users
//
// post users/:uuid
//
// delete /users/:uuid


usersRoute.get('/users', (req: Request, res: Response, next: NextFunction) => {
  const users = [{userName:'Glen'}]
  res.status(200).send(users)
})

export default usersRoute;


