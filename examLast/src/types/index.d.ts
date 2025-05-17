import { userData } from 'src/interfaces/req-user.interface';

declare global {
  namespace Express {
    interface Request {
      user: userData;
    }
  }
}
