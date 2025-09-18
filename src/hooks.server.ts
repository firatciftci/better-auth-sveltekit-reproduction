import { redirect, type Handle } from "@sveltejs/kit";
import { building } from "$app/environment";
import { auth } from "$lib/auth";
import { connect } from "$lib/db-connect";
import { svelteKitHandler } from "better-auth/svelte-kit";

await connect();

export const handle: Handle = async ({ event, resolve }) => {
  const session = await auth.api.getSession({
    headers: event.request.headers,
  });

  if (session) {
    event.locals.user = session.user;
    event.locals.session = session.session;
  }

  if (
    event.locals.session === null &&
    event.url.pathname !== "/signin" &&
    event.url.pathname !== "/signup"
  ) {
    return redirect(303, "/signin");
  }

  return svelteKitHandler({ event, resolve, auth, building });
};
