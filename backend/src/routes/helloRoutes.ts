import { Router } from 'express';
import * as helloController from '../controllers/helloController';

const router = Router();

router.get('/', helloController.getHello);
router.get('/error', helloController.getError);

export default router;
