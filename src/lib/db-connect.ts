/* eslint-disable ts/strict-boolean-expressions */
/* eslint-disable vars-on-top */
/* eslint-disable ts/no-explicit-any */
/* eslint-disable ts/no-unsafe-return */
/* eslint-disable ts/no-unsafe-member-access */
/* eslint-disable ts/no-unsafe-assignment */
import { MONGO_URL } from "$env/static/private";
import mongoose from "mongoose";

declare global {
  var mongoose: any; // This must be a `var` and not a `let / const`
}

let cached = globalThis.mongoose;
cached ??= globalThis.mongoose = { conn: null, promise: null };

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  cached.promise ??= mongoose.connect(MONGO_URL).then((mongoose) => {
    return mongoose;
  });
  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default dbConnect;
