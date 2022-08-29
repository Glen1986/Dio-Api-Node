 import { User } from '../models/user.mdels';

declare module 'express-serve-static-core'{
  interface Request {
    user?: User            
  }
}
