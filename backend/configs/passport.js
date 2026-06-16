import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oidc";

import  prisma  from "../configs/prisma.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

      callbackURL:
        `${process.env.BACKEND_URL}/users/google/callback`,

      scope: ["openid", "profile", "email"],
    },

    async (issuer, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;

        let user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              email,
              name: profile.displayName,
              googleId: profile.id,
              profilePicture: profile.photos?.[0]?.value,
            },
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    },
  ),
);


export default passport;