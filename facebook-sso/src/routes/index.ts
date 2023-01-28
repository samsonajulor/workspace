import express, { Response, Request } from "express";
const router = express.Router();

const renderHome = (req: Request, res: Response) => {
  console.log("homePage");
  res.render("home");
};

const renderDashboard = (req: Request, res: Response) => {
    console.log('dashboard')
    res.render('dashboard')
}

router.route("/").get(renderHome);
router.route('/dashboard').get(renderDashboard)


export default router;
