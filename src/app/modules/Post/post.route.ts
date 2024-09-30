



import { Router } from "express";
import { postController } from "./post.controller";
import { multerUpload } from "../../config/multer.config";
import auth from "../../middlewares/auth";


const router = Router();

router.get('/get', postController.getposts);

router.post('/createpost', 
    multerUpload.single('image'),
    auth("user","admin"),
    postController.createpost);

router.post('/upvotepost', auth("user","admin"), postController.upvotepost);
router.post('/downvotepost', auth("user","admin"), postController.downvotepost);

router.post('/addcomment', auth("user","admin"), postController.addcomment);





export const postRoutes = router;