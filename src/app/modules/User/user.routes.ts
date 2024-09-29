import { Router } from "express";
import { USER_ROLE } from "./user.utils";
import auth from "../../middlewares/auth";
import { userController } from "./user.controller";

const router = Router();

router.get('/me',auth(USER_ROLE.admin,USER_ROLE.user), userController.userGetProfile); // get user profile

router.put('/me',auth(USER_ROLE.admin,USER_ROLE.user), userController.userUpdateProfile); // update user profile






export const userRoutes = router;