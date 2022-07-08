import express, { Response, Request, NextFunction, json, urlencoded } from 'express';
var router = express.Router();

/* GET users listing. */
router.get('/', function(req: Request, res: Response, next: NextFunction) {
  res.send('respond with a resource');
});

export default router;
