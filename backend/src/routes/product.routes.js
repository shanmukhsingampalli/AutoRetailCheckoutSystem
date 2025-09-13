import {Router} from 'express';
import verifyAdmin from '../middleware/auth.middleware.js';
import { getProductDetails, searchProducts, updateProduct, viewAllProducts } from '../controllers/product.controller.js'; 

const router = new Router();

router.route('/getProducts').post( getProductDetails);

router.route("/updateProduct").post( verifyAdmin, updateProduct);

router.route("/viewAllProducts").post( viewAllProducts);

router.route("/searchProducts").post(searchProducts);

export default router;