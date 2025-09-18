import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { connect, getDB } from "./db-connect";
import { sveltekitCookies } from "better-auth/svelte-kit";
import { getRequestEvent } from "$app/server";
import { BETTER_AUTH_SECRET, BETTER_AUTH_URL } from "$env/static/private";

await connect();

const db = getDB();

export const auth = betterAuth({
  database: mongodbAdapter(db, { usePlural: true }),
  plugins: [sveltekitCookies(getRequestEvent)],
  secret: BETTER_AUTH_SECRET,
  trustedOrigins: [BETTER_AUTH_URL],
  emailAndPassword: {
    enabled: true,
  },
});
