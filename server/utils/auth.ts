import type { H3Event } from 'h3';
import { auth } from '~~/lib/auth';

export async function getServerSession(event: H3Event) {
  const request = toWebRequest(event);
  const session = await auth.api.getSession({
    headers: request.headers,
  });
  return session;
}

export async function requireAuth(event: H3Event) {
  const session = await getServerSession(event);

  if (!session?.user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized - Please sign in',
    });
  }

  return session;
}

export async function getActiveOrgId(event: H3Event) {
  const session = await getServerSession(event);
  return session?.session?.activeOrganizationId ?? null;
}

export async function getFullOrganization(event: H3Event) {
  const request = toWebRequest(event);
  const org = await auth.api.getFullOrganization({
    headers: request.headers,
  });
  return org;
}

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
