import { Router } from 'express';
import { paymentControler } from './payment.controller';


const router = Router();

router.post('/confirmation', paymentControler.confirmationController)
router.post('/initiate', paymentControler.initiateController)





export const paymentRoutes = router;