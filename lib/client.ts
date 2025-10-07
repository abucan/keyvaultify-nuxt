import { createAuthClient } from 'better-auth/vue';
import { emailOTPClient, organizationClient } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
  baseURL: 'http://localhost:3000',
  plugins: [emailOTPClient(), organizationClient()],
});

export const { signIn, signUp, useSession } = createAuthClient();
