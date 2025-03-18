import { Router } from 'express';
import loginRequired from '../middlewares/loginRequired';
import userController from '../controllers/userController';

const router = new Router();

router.post('/', loginRequired, userController.store);

export default router;
