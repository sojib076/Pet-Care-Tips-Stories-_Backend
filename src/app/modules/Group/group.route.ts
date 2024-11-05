import { Router } from "express";
import { GroupController } from "./Group.controller";
import auth from "../../middlewares/auth";




const router = Router();

router.post('/creategroup', auth("admin","user") ,GroupController.creategroup );
router.get('/getusercreategroup', auth("admin","user") ,GroupController.getUserCreateGroup );
// discovergroup
router.get('/discovergroup', auth("admin","user") ,GroupController.discoverGroup );
router.get('/getsinglegroup/:id' ,GroupController.getsinglegroup );

// deletegroup
router.delete('/deletegroup/:id', auth("admin","user") ,GroupController.deleteGroup );


export const groupRoutes = router;