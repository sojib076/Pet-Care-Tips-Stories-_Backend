import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { userRoutes } from '../modules/User/user.routes';
import { postRoutes } from '../modules/Post/post.route';
import { paymentRoutes } from '../modules/payment/payment.route';


type TModuleRoutes = {
  path: string;
  route: Router;
};

const router = Router();

const moduleRoutes: TModuleRoutes[] = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/user', 
    route: userRoutes
  },
  {
    path: '/post',
    route: postRoutes
  },
  {
    path: '/payment',
    route: paymentRoutes
  }

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
