import GithubAuthProvider from 'next-auth/providers/github';
import NextAuth from 'next-auth';

export default NextAuth({
    providers: [
        GithubAuthProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
})