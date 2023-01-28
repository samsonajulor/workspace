import express from "express";
import passport from "passport";
const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    successRedirect: "/dashboard",
  })
);
 
router.get('/logout', function (req: any, res: any){
    res.clearCookie('refreshtoken')
    res.clearCookie('accessToken')
    // req.logOut();
    console.log('logout successful')
    res.render('home')
})

//facebook routes

// route middleware to make sure
function isLoggedIn(req: any, res: any, next: any) {
  if (req.isAuthenticated()) return next()
  res.redirect('/auth/retry')
}

router.get('/facebook', passport.authenticate('facebook', { scope: 'email' }))

router.get('/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/dashboard',
    failureRedirect: '/'
  }))


// router.get('/profile', isLoggedIn, function (req, res) {
//   // console.log(req.user)
//   // res.render('profile', {
//   //  user: req.user // get the user out of session and pass to template
//   // });

//   res.render('profile')
// });

// router.get('/', (req, res) => {
//   res.render("FBLogin")
// })
// router.get('/retry', (req, res) => {
//   res.render("retry")
// })

export default router