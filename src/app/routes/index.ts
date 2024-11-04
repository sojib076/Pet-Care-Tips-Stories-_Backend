import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { userRoutes } from '../modules/User/user.routes';
import { postRoutes } from '../modules/Post/post.route';
import { paymentRoutes } from '../modules/payment/payment.route';
import { adminRoutes } from '../modules/Admin/admin.route';
import { groupRoutes } from '../modules/Group/group.route';


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
  },
  {
    path: '/admin',
    route: adminRoutes
  },
  {
    path: '/group',
    route: groupRoutes
  }

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
