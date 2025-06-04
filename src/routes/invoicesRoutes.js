import { Router } from 'express';
import loginRequired from '../middlewares/loginRequired.js';
import invoiceController from '../controllers/invoiceController.js';

const router = new Router();

router.post('/', loginRequired, invoiceController.store);
router.get('/', loginRequired, invoiceController.index);
router.put('/:id', loginRequired, invoiceController.update);
router.put('/month/:id', loginRequired, invoiceController.updateMonth);
router.delete('/:id', loginRequired, invoiceController.delete);

export default router;
