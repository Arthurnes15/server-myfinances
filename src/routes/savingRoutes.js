import { Router } from 'express';
import loginRequired from '../middlewares/loginRequired.js';
import savingController from '../controllers/SavingController.js';

const router = new Router();

router.post('/', loginRequired, savingController.store);
router.get('/', loginRequired, savingController.index);
router.put('/:id', loginRequired, savingController.update);
router.delete('/:id', loginRequired, savingController.delete);

export default router;
