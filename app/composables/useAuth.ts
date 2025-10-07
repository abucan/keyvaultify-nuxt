import { authClient } from '~~/lib/client';
import type { Session } from '~~/server/utils/auth';

export const useAuth = () => {
  const session = useState<Session | null>('auth:session', () => null);
  const user = computed(() => session.value?.user ?? null);
  const isAuthenticated = computed(() => !!user.value);

  const fetchSession = async () => {
    try {
      const response = await authClient.getSession();
      session.value = response.data as Session;
      return response.data;
    } catch (error) {
      console.error(error);
      session.value = null;
      return null;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await authClient.signIn.email({ email, password });

      if (response.data) {
        await fetchSession();
      }

      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const signOut = async () => {
    await authClient.signOut();
    session.value = null;
    await navigateTo('/signin');
  };

  onMounted(async () => {
    if (!session.value) {
      await fetchSession();
    }
  });

  return {
    user,
    session,
    isAuthenticated,
    fetchSession,
    signIn,
    signOut,
  };
};
