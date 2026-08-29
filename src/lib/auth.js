

// import { betterAuth } from "better-auth";
// import { jwt } from "better-auth/plugins";
// import { MongoClient } from "mongodb";
// import { mongodbAdapter } from "better-auth/adapters/mongodb";

// if (!process.env.MONGODB_URI) {
//   throw new Error("MONGODB_URI is missing in environment variables");
// }

// const client = new MongoClient(process.env.MONGODB_URI);
// const db = client.db("mentoradb");

// export const auth = betterAuth({
//   database: mongodbAdapter(db, {
//     client,
//   }),

//   emailAndPassword: {
//     enabled: true,
//   },

//   session: {
//     cookieCache: {
//       enabled: true,
//       strategy: "jwt",
//       maxAge: 5 * 24 * 60 * 60,
//     },
//   },

//   plugins: [jwt()],

//   socialProviders: {
//     google: {
//       clientId: process.env.GOOGLE_CLIENTID || "",
//       clientSecret: process.env.GOOGLE_SECRET || "",
//     },
//   },
// });



import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const uri = process.env.MONGODB_URI;

// Safe Handling for Build Time
if (!uri && process.env.NODE_ENV === "production") {
  console.warn("Warning: MONGODB_URI is missing in environment variables.");
}

// Database Connection Helper
const client = new MongoClient(uri || "mongodb://localhost:27017/dummy");
const db = client.db("mentoradb");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  // Domain & CORS Handling
  baseURL:
    process.env.BETTER_AUTH_URL ||
    "https://assigment-9-perject-lt4wfe4lb-rimon-hasan.vercel.app" || "https://assigment-9-perject.vercel.app",

  trustedOrigins: [
    "http://localhost:3000",
    "https://assigment-9-perject-lt4wfe4lb-rimon-hasan.vercel.app",
    "https://assigment-9-perject.vercel.app",
  ],

  emailAndPassword: {
    enabled: true,
  },

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 24 * 60 * 60,
    },
  },

  plugins: [jwt()],

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENTID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    },
  },
});