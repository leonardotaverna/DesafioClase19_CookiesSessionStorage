import { Router } from 'express';
//import productsManager from '../ProductsManager.js';
import productsManagerMongoDB from '../ProductsManagerMongoDB.js';
import __dirname from '../utils.js';


const router = Router();

router.get("/", async (req, res) => {
    try{
        const products = await productsManagerMongoDB.getProducts(req.query);
        res.render('home', {products});
    } catch (error){
        return erorr
    }
    
});

router.get('/realtimeproducts', async (req, res) => {
    try {
        const products = await productsManagerMongoDB.getProducts(req.query);
    res.render('realTimeProducts', {products})
    } catch (error) {
        return error
    }

});

export default router;