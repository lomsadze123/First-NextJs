import connectDB from "@/config/database";
import User from "@/models/userModel";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";

const login = async (credentials: Record<string, string> | undefined) => {
  try {
    if (!credentials?.email || !credentials?.password) {
      throw new Error("Email and password are required");
    }

    await connectDB();
    const user = await User.findOne({ email: credentials?.email });

    if (!user) throw new Error("Wrong credentials");

    const isCorrect =
      credentials?.password &&
      (await bcrypt.compare(credentials.password, user.password));

    if (!isCorrect) throw new Error("Wrong credentials");

    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};

const authOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "username",
          type: "text",
          placeholder: "Enter username",
        },
        password: { label: "password", type: "password" },
      },
      async authorize(
        credentials: Record<string, string> | undefined
      ): Promise<any> {
        try {
          const user = await login(credentials);
          console.log("this is user", user);
          return user;
        } catch (error) {
          throw new Error("Failed to login");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.username = user.username;
        token.email = user.email;
        token.id = user.id;
      }
      console.log("this is token", token);

      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.id = token.id;
      }
      console.log("this is session", session);

      return session;
    },
  },
  secret:
    process.env.YOUR_SECRET_NAME ||
    "6a33ad59526fdd813d351dfa5005cb715b8b612ff08eefc361d171c940ab0126",
};

export default authOptions;
