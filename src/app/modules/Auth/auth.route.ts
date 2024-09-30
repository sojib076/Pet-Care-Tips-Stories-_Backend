
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthControllers } from './auth.controller';
import { multerUpload } from '../../config/multer.config';




const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);

router.post(
  '/register',
multerUpload.single('profileImage'),
  validateRequest(AuthValidation.registerUserValidationSchema),
  AuthControllers.registerUser,
);

router.post('/google-login', AuthControllers.googleLogin);


router.post(
  '/forget-password',
  AuthControllers.forgetPassword,
);

router.post(
  '/reset-password',
  AuthControllers.resetPassword,
);



export const AuthRoutes = router;
