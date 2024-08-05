import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z
      .string()
      .url()
      .refine(
        (str) => !str.includes("YOUR_MYSQL_URL_HERE"),
        "You forgot to change the default URL"
      ),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    SENDGRID_API_KEY: z
      .string(),
    QSTASH_TOKEN: z
      .string(),
    BACKEND_URL: z
      .string()
      .url(),
    REALTIME_APP_KEY: z
      .string(),
    REALTIME_APP_ID: z
      .string(),
    REALTIME_APP_SECRET: z
      .string(),
    REALTIME_APP_CLUSTER: z
      .string(),
    REALTIME_APP_CHANNEL: z
      .string(),
    REALTIME_APP_EVENT: z
      .string(),
    SENDGRID_VERIFIED_SENDER: z
      .string(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
    NEXT_PUBLIC_REALTIME_APP_KEY: z
      .string(),
    NEXT_PUBLIC_REALTIME_APP_CLUSTER: z
      .string(),
    NEXT_PUBLIC_REALTIME_APP_CHANNEL: z
      .string(),
    NEXT_PUBLIC_REALTIME_APP_EVENT: z
      .string()
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    QSTASH_TOKEN: process.env.QSTASH_TOKEN,
    BACKEND_URL: process.env.BACKEND_URL,
    REALTIME_APP_KEY: process.env.PUSHER_APP_KEY,
    REALTIME_APP_ID: process.env.PUSHER_APP_ID,
    REALTIME_APP_SECRET: process.env.PUSHER_APP_SECRET,
    REALTIME_APP_CLUSTER: process.env.PUSHER_APP_CLUSTER,
    REALTIME_APP_CHANNEL: process.env.PUSHER_APP_CHANNEL,
    REALTIME_APP_EVENT: process.env.PUSHER_APP_EVENT,
    SENDGRID_VERIFIED_SENDER: process.env.SENDGRID_VERIFIED_SENDER,
    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
    NEXT_PUBLIC_REALTIME_APP_KEY: process.env.NEXT_PUBLIC_REALTIME_APP_KEY,
    NEXT_PUBLIC_REALTIME_APP_CLUSTER: process.env.NEXT_PUBLIC_REALTIME_APP_CLUSTER,
    NEXT_PUBLIC_REALTIME_APP_CHANNEL: process.env.NEXT_PUBLIC_REALTIME_APP_CHANNEL,
    NEXT_PUBLIC_REALTIME_APP_EVENT: process.env.NEXT_PUBLIC_REALTIME_APP_EVENT,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined.
   * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
