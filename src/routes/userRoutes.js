import { Router } from 'express';
// import loginRequired from '../middlewares/loginRequired.js';
import userController from '../controllers/userController.js';

const router = new Router();

router.post('/', userController.store);

export default router;
