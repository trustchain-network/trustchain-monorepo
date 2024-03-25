import { Session } from 'src/modules/sessions/domain/session';

export type JwtRefreshPayloadType = {
  sessionId: Session['id'];
  iat: number;
  exp: number;
};
