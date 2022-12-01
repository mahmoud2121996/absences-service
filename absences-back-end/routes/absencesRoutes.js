import express from 'express';
import { getAbsences } from '../controllers/absencesController'

const router = express.Router();

router.get('/', getAbsences);

export default router;