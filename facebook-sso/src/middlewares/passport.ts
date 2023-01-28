import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { User } from '../model/userModel';
import passport, { PassportStatic } from 'passport';
import { Request } from 'express';
import { Strategy as FBStrategy } from "passport-facebook"


export const facebookStrategy = (passport: PassportStatic) =>
  passport.use(
    new FBStrategy(
      {
        clientID: process.env.FACEBOOK_ID as string,
        clientSecret: process.env.FACEBOOK_SECRET as string,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL as string,
        profileFields: ['name', 'picture.type(large)', 'email'],
      }, // facebook will send back the token and profile
      async function (token: string, refreshToken: string, profile: any, done: any) {
        token;
        refreshToken;
        console.log(profile);
        const newUser = {
          firstName: profile.name.givenName + ' ' + profile.name.familyName, // look at the passport user profile to see how names are returned
          profilePic: profile.photos ? profile.photos[0].value : null,
          email: profile.emails[0].value,
          provider: profile.provider,
        };
        done(null, newUser);
        // try {
        //   let user = await User.findOne({ email: profile.emails[0].value });
        //   if (user) {
        //     done(null, user);
        //   } else {
        //     // user = await User.create(newUser);
        //     done(null, user);
        //   }
        // } catch (err) {
        //   console.error(err);
        // }
      },
    ),
  );


export const googleStrategy = (passport: PassportStatic) => passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID as string,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
  passReqToCallback: true,
},
  async (
    req: Request,
    accessToken: string,
    refreshToken: string,
    params: any,
    profile: any,
    done: (arg0: null, arg1: string) => void,
  ) => {
    console.log(profile);
    const newUser = {
      isActive: true,
      email: profile.emails[0].value,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName, // look at the passport user profile to see how names are returned
      profilePic: profile.photos ? profile.photos[0].value : null,
      provider: profile.provider,
    };
    try {
      let user: any = await User.findOne({ email: profile.emails[0].value });
      if (user) {
        done(null, user);
      } else {
        user = await User.create(newUser);
        done(null, user);
      }
    } catch (err) {
      console.error(err);
    }
  },
),
);

passport.serializeUser((profile, done) => {
  done(null, profile)
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err: any, user: any) => done(err, user))
})