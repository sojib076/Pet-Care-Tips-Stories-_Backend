import { Router } from "express";

import { adminController } from "./admin.controller";
import auth from "../../middlewares/auth";



const router = Router();
router.get('/getallpost', auth('admin'), adminController.getallpost); 
router.get('/getalluser', auth('admin') ,adminController.getallusers ); 

router.put('/roleamdin', auth("admin"), adminController.changeRoleadmin);
router.put('/roleuser', auth('admin') ,adminController.changeRoleuser);
router.put('/userblock', auth('admin'), adminController.userblock);
router.post('/postpublish', auth('admin'), adminController.postpublish);







export const adminRoutes = router;