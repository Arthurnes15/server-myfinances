import { Router } from 'express';
import loginRequired from '../middlewares/loginRequired.js';
import userController from '../controllers/UserController.js';

const router = new Router();

router.post('/', loginRequired, userController.store);

export default router;
