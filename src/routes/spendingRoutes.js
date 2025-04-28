import { Router } from 'express';
import loginRequired from '../middlewares/loginRequired.js';
import spendingController from '../controllers/SpendingController.js';

const router = new Router();

router.post('/', loginRequired, spendingController.store);
router.get('/', loginRequired, spendingController.index);
router.delete('/:id', loginRequired, spendingController.delete);
router.put('/:id', loginRequired, spendingController.update);

export default router;
