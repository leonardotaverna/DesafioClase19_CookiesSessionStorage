import { Router } from 'express';
//import productsManager from '../ProductsManager.js';
import productsManagerMongoDB from '../ProductsManagerMongoDB.js';


const router = Router();

router.get("/", async (req, res) => {
    const products = await productsManagerMongoDB.getProducts(req.query);
    res.render('home', {products});
});

router.get('/realtimeproducts', async (req, res) => {
    const products = await productsManagerMongoDB.getProducts(req.query);
    res.render('realTimeProducts', {products})
});

export default router;