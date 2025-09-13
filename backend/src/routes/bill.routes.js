import {Router} from 'express';
import verifyAdmin from '../middleware/auth.middleware.js';
import { createBill, getBillDetails, searchBills, viewAllBills } from '../controllers/bill.controller.js';

const router = new Router();

router.route("/createBill").post(createBill);

router.route("/viewAllBills").post(verifyAdmin, viewAllBills)

router.route("/searchBills").post(verifyAdmin, searchBills);

router.route("/getBillDetails").post( getBillDetails);

export default router;