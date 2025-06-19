import { Router } from 'express';
import userController from '../controllers/userController.js';
import loginRequired from '../middlewares/loginRequired.js';

const router = new Router();

router.post('/', userController.store);
router.put('/updatePassword', loginRequired, userController.updatePassword);

export default router;
