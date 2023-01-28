import express, {Request, Response, NextFunction} from 'express'
import { signUp } from '../controllers/userController';

const router = express.Router();

router.get('/',(req: Request, res: Response)=>{
 res.render('index')
})
router.post('/signup', signUp)

export default router