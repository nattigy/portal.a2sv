import NextAuth, { NextAuthOptions } from "next-auth";
// import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import { GraphQLClient, gql } from "graphql-request";
import configs from "../../../lib/constants/configs";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    // GithubProvider({
    //     clientId: process.env.GITHUB_ID,
    //     clientSecret: process.env.GITHUB_SECRET,
    // }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      id: "credentials",
      name: "credentials",

      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      credentials: {},
      async authorize(credentials: any, req: any): Promise<any> {
        console.log("password");
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        // Add logic here to look up the user from the credentials supplied
        const user = { id: 1, name: "J Smith", email: "jsmith@example.com" };

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null or false then the credentials will be rejected
          return null;
          // You can also Reject this callback with an Error or with a URL:
          // throw new Error('error message') // Redirect to error page
          // throw '/path/to/redirect'        // Redirect to a URL
        }

        // Add logic here to look up the user from the credentials supplied
        // const { data: user } = {
        //   data: {
        //     user: { id: 1, name: "", email: "email@email" },
        //   },
        // };
        // return user;
        // if (user) {
        //   return { ...user, id: user.id };
        // }

        // const grafbase = new GraphQLClient(configs.API_URL as string, {
        // headers: {
        //   "x-api-key": configs.API_URL as string,
        // },
        // });
        // const GetUserByUsername = gql`
        //   mutation SIGN_IN_MUTATION($loginInput: LoginInput!) {
        //     login(loginInput: $loginInput) {
        //       accessToken
        //       userId
        //     }
        //   }
        // `;

        // const data = await grafbase.request(GetUserByUsername, {
        //   email,
        //   password,
        // });
        // return data;
        // If you return null then an error will be displayed advising the user to check their details.
        // return new Error('Invalid Credentials!');
        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      },
    }),
  ],

  pages: {
    signIn: "/auth",
    error: "/auth",
    signOut: "/auth/signout",
  },
  // session: {
  //   strategy: "jwt",
  // },
  // debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET || "asfasf",
  jwt: {
    secret: process.env.NEXTAUTH_SECRET || "",
    // encryption: true,
  },

  // callbacks: {
  //   async signIn({ user, account, profile, email, credentials }) {
  //     console.log(user, account, profile, email, credentials);
  //     return true;
  //   },
  //   async jwt({ token, account, user }) {
  //     console.log("nnnnn", user, token, account);

  //     // Persist the OAuth access_token to the token right after signin
  //     // if (account) {
  //     //   token.accessToken = account.access_token;
  //     // }
  //     return token;
  //   },
  //   async session({ session, token, user }: any) {
  //     console.log("nati");
  //     // Send properties to the client, like an access_token from a provider.
  //     // session.id = token.id;
  //     return session;
  //   },

  //   // async jwt({ token, account, user, profile, isNewUser }) {
  //   //   if (user) {
  //   //     const { token: access_token } = user as any;
  //   //     // setApiToken(access_token);
  //   //     token.accessToken = access_token;
  //   //     console.log(access_token, "------a--------");
  //   //   }
  //   //   return token;
  //   // },
  // },
};

export default NextAuth(authOptions);

// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import configs from "../../../lib/constants/configs";

// export default NextAuth({
// //   pages: {
// //     signIn: "/auth",
// //     signOut: "/auth/signout",
// //   },
// //   session: {
// //     strategy: "jwt",
// //   },
// //   callbacks: {
// //     async jwt({ token, user }: any) {
// //       console.log(token, user, " tokennnnnnnn");
// //       //   if (user?._id) token._id = user._id;
// //       return token;
// //     },
// //     async session({ session, token }: any) {
// //       console.log(token, session, " tokennnnnnnn");

// //       //   if (token?._id) session.user._id = token._id;
// //       return session;
// //     },
// //   },
//   providers: [
//     CredentialsProvider({
//       credentials: {},
//       async authorize(credentials: any) {
//         const { email, password } = credentials as {
//           email: string;
//           password: string;
//         };
//         console.log(email, password, " email and password");
//         // const query = JSON.stringify({
//         //   query: `mutation SIGN_IN_MUTATION($loginInput: LoginInput!) {
//         //             login(loginInput: $loginInput) {
//         //             accessToken
//         //             userId
//         //             }
//         //         }
//         //     `,
//         // });

//         // const response: any = await fetch(configs.NEXT_PUBLIC_API_URL, {
//         //   headers: { "content-type": "application/json" },
//         //   method: "POST",
//         //   //   credentials: "include",
//         //   body: JSON.stringify({
//         //     query,
//         //     variables: {
//         //       email,
//         //       password,
//         //     },
//         //   }),
//         // });

//         // const response: any = await fetch(configs.API_URL, {
//         //   method: "POST",
//         //   headers: {
//         //     "Content-Type": "application/json",
//         //     Accept: "application/json",
//         //   },
//         //   body: JSON.stringify({
//         //     query,
//         //     variables: {
//         //       email: credentials.email,
//         //       password: credentials.password,
//         //     },
//         //   }),
//         // });
//         return {
//           email: "nati@gmail.com",
//           name: "nati",
//         };
//         // const { data }: any = await response.json();
//         // console.log("response dataaaa", data);
//         // if (data) {
//         //   return {
//         //     _id: data.user.id,
//         //     name: data.user.username,
//         //     email: data.user.email,
//         //   };
//         // }
//         throw new Error("Invalid email or password");
//       },
//     }),
//   ],
// });
