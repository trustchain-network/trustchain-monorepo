import { Session } from 'src/modules/sessions/domain/session';
import { User } from 'src/modules/users/domain/user';

export type JwtPayloadType = Pick<User, 'id' | 'role'> & {
  sessionId: Session['id'];
  iat: number;
  exp: number;
};
