import { Router } from 'express';
import { paymentControler } from './payment.controller';
import auth from '../../middlewares/auth';


const router = Router();

router.post('/confirmation' , paymentControler.confirmationController)
router.post('/initiate' ,auth('admin','user'), paymentControler.initiateController)



export const paymentRoutes = router;