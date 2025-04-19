import { Router } from 'express';
import loginRequired from '../middlewares/loginRequired';
import spendingController from '../controllers/SpendingController';

const router = new Router();

router.post('/', loginRequired, spendingController.store);
router.get('/', loginRequired, spendingController.index);
router.delete('/:id', loginRequired, spendingController.delete);
router.put('/:id', loginRequired, spendingController.update);

export default router;
