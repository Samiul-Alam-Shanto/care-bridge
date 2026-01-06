import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/db";

export const authOptions = {
  // 1. Configure Providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // A. Validate Input
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        // B. Connect to DB
        const client = await clientPromise;
        const db = client.db("care-bridge");
        const user = await db
          .collection("users")
          .findOne({ email: credentials.email });

        // C. Verify User & Password
        if (!user || !user.password) {
          throw new Error("User not found or password incorrect");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) throw new Error("Invalid password");

        // D. Return User (This object is passed to the JWT callback)
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role || "user",
        };
      },
    }),
  ],

  // 2. Session Strategy (JWT is required since we have no Adapter)
  session: {
    strategy: "jwt",
  },

  // 3. Secret Key
  secret: process.env.AUTH_SECRET,

  // 4. Custom Pages
  pages: {
    signIn: "/login",
    error: "/login",
  },

  // 5. Callbacks (The Critical Logic)
  callbacks: {
    /**
     * signIn: Triggered when user logs in.
     * use this to MANUALLY save Google Users to MongoDB.
     */
    async signIn({ user, account }) {
      if (account.provider === "google") {
        const client = await clientPromise;
        const db = client.db("care-bridge");

        // Check if user exists
        const existingUser = await db
          .collection("users")
          .findOne({ email: user.email });

        if (!existingUser) {
          // CREATE NEW USER (Google)
          await db.collection("users").insertOne({
            name: user.name,
            email: user.email,
            image: user.image,
            role: "user", // Default role
            provider: "google",
            createdAt: new Date(),
          });
        }
      }
      return true; // Allow login/
    },

    /**
     * jwt: Triggered whenever a JSON Web Token is created/updated.
     * We add custom fields (id, role) here so they are available in the session.
     */
    async jwt({ token, user, trigger, session }) {
      // 1. Initial Login
      if (user) {
        token.id = user.id;
        token.role = user.role || "user";

        // Fetch role from DB for Google logins
        if (!user.role) {
          const client = await clientPromise;
          const db = client.db("care-bridge");
          const dbUser = await db
            .collection("users")
            .findOne({ email: user.email });
          if (dbUser) {
            token.id = dbUser._id.toString();
            token.role = dbUser.role;
            token.phone = dbUser.phone; // Add phone to token
          }
        }
      }

      // 2. Handle Session Update (Triggered by client)
      if (trigger === "update" && session) {
        // Merge the new session data into the token
        return { ...token, ...session.user };
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.phone = token.phone;
        if (token.name) session.user.name = token.name;
        if (token.image) session.user.image = token.image;
      }
      return session;
    },
  },
};
