import { Router } from "express";
import auth from "../../middlewares/auth";
import { userController } from "./user.controller";


const router = Router();

router.get('/me',auth("admin","user"), userController.userGetProfile); 
router.put('/me' ,auth("admin","user"), userController.userUpdateProfile); 
router.get('/getuserposts', auth('admin','user') , userController.getUserPosts);
router.get('/:userId', userController.getUserbyProfile);
router.post('/followuser', auth('admin','user') ,userController.followUser); 
router.get('/getfollowedUsers', auth('admin','user') , userController.getFollowedUsers); 









export const userRoutes = router;