'use client';

import GoogleAuth from './google/google-auth';
import { isGoogleAuthEnabled } from './google/google-config';

export default function SocialAuth() {
  return (
    <div className="grid grid-cols-2 gap-6">
      {isGoogleAuthEnabled && <GoogleAuth />}
    </div>
  );
}
