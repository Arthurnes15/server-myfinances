import { Router } from 'express';

import loginRequired from '../middlewares/loginRequired.js';
import photoController from '../controllers/photoController.js';

const router = new Router();

router.post('/', loginRequired, photoController.store);

export default router;
