import createError, { HttpError } from 'http-errors'
import express, { Request, Response, NextFunction } from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import dotenv from "dotenv";
import indexRouter from "./routes/index";
import authRouter from "./routes/auth";
import UserRouter from './routes/userRoute'
import { googleStrategy, facebookStrategy } from "./middlewares/passport";
import path from 'path'
import bodyParser from 'body-parser'
// import cors from "cors"
import passport from "passport"
// import session from 'express-session'
// import {User} from './model/userModel'

dotenv.config();
const app = express()
googleStrategy(passport);
facebookStrategy(passport)

// // view engine setup
app.set('views', path.join(`${__dirname}/../`, 'views'))
app.set('view engine', 'ejs')

// app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.set("view engine", "ejs");


// app.use(session({
//   secret: 'jlkhjlhkhlhlkjhlkjhlkj',
//   resave: true,
//   saveUninitialized: true,
// }))

// app.use
//   cors({
//     origin: "http://localhost:3000/",
//     methods: "GET,POST,PUT,DELETE",
//     credentials: true,
//   })
// )

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(`${__dirname}/../`, 'public')))

//Routes middleware
app.use("/", indexRouter);
app.use("/user", UserRouter)
app.use("/auth", authRouter);

//start up passport function
app.use(passport.initialize());
app.use(passport.session());


// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500).json({
    status: "fail",
    message: "Ommooo this life ehhn",
  });
});




export default app;
