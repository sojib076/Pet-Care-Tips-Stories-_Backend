import { Router } from "express";

import { adminController } from "./admin.controller";
import auth from "../../middlewares/auth";



const router = Router();

router.get('/getalluser', auth('admin') ,adminController.getallusers ); 
router.get('/getallpost', auth('admin'), adminController.getallpost ); 

router.put('/roleamdin', adminController.changeRoleadmin);
router.put('/roleuser', adminController.changeRoleuser);







export const adminRoutes = router;