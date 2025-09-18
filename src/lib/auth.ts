import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import dbConnect from "./db-connect";
import mongoose from "mongoose";
import { sveltekitCookies } from "better-auth/svelte-kit";
import { getRequestEvent } from "$app/server";
import { BETTER_AUTH_SECRET, BETTER_AUTH_URL } from "$env/static/private";

await dbConnect();

const db = mongoose.connection.db!;
const client = mongoose.connection.getClient();

export const auth = betterAuth({
  database: mongodbAdapter(db, { client, usePlural: true }),
  plugins: [sveltekitCookies(getRequestEvent)],
  secret: BETTER_AUTH_SECRET,
  trustedOrigins: [BETTER_AUTH_URL],
  emailAndPassword: {
    enabled: true,
  },
});
