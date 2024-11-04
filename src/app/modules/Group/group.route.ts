import { Router } from "express";
import { GroupController } from "./Group.controller";
import auth from "../../middlewares/auth";




const router = Router();

router.post('/creategroup', auth("admin","user") ,GroupController.creategroup );
router.get('/getusercreategroup', auth("admin","user") ,GroupController.getUserCreateGroup );
// discovergroup
router.get('/discovergroup', auth("admin","user") ,GroupController.discoverGroup );


export const groupRoutes = router;