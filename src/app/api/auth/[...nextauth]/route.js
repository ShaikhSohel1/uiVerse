import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"



export const authOption = {
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }),
    ],
  }
  
  const handler = NextAuth(authOption)

export { handler as GET, handler as POST }