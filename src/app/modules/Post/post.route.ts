



import { Router } from "express";
import { postController } from "./post.controller";

import auth from "../../middlewares/auth";


const router = Router();
router.get('/getfollwingposts', auth("user", "admin"), postController.getuserfollowignposts);
router.get('/get', postController.getposts);

router.post('/createpost',

    auth("user", "admin"),
    postController.createpost);

router.post('/upvotepost', auth("user", "admin"), postController.upvotepost);
router.post('/downvotepost', auth("user", "admin"), postController.downvotepost);

router.post('/addcomment', auth("user", "admin"), postController.addcomment);
router.put('/editcomment', auth("user", "admin"), postController.updateComment);
router.delete('/deletecomment', auth("user", "admin"), postController.deleteComment);






export const postRoutes = router;