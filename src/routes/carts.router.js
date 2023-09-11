import { Router } from "express";
//import cartsManager from "../cartsManager.js";
import cartsManagerMongoDB from "../cartsManagerMongoDB.js";

const router = Router ()

//getCarts()
router.get('/', async (req, res) => {
    try {
        const carts = await cartsManagerMongoDB.getCarts()    
        res.status(200).json({ message: 'Carts', carts })
    } catch (error) {
        res.status(500).json({ error })
    }
});

//getCartById()
router.get ('/:cid', async (req,res) => { 
    const {cid} = req.params
    try {
        const carts = await cartsManagerMongoDB.getCartById(cid)
        res.status(200).json      ({message: 'Carts', carts})
    } catch (error) {
        res.status(500).json ({ error })
        
    }
});

//createCart()
router.post('/', async(req, res) => {
    console.log(req.body);
    try {
        const newCart = await cartsManagerMongoDB.createCart(req.params)
        res.status(200).json({message: 'Cart created', cart:newCart}) 
    } catch (error) {
        res.status(500).json ({ error })    
    }
});

//addProductToCart
router.post ('/:cid/products/:pid', async (req,res) => {
    const{cid, pid} = req.params
    try {
        const addProductToCart = await cartsManagerMongoDB.addProductToCart(cid, pid)
        res.status (200).json ({message:'Cart products', cart:addProductToCart})
    } catch (error) {
        res.status(500).json ({ error }) 
    }
});

//deleteCart
router.delete('/:cid', async (req, res) => {
    const { cid } = req.params
    try {
        const deletedCart = await cartsManagerMongoDB.deleteCart(cid)
        res.status(200).json({ message: 'Cart deleted', deletedCart })
    } catch (error) {
        res.status(500).json({ error })
    }
});

//deleteProdFromCart
router.delete('/:cid/product/:pid', async (req,res) => {
    const {cid, pid} = req.params
    try {
        const deletedProduct = await cartsManagerMongoDB.deleteProductFromCart(cid,pid)
        res.status(200).json({ message: 'Product deleted form cart', deletedProduct })
    
    } catch (error) {
        res.status(500).json({ error })
    }
});

// updateProductQuantity
router.put('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;

        const updatedCart = await cartsManagerMongoDB.updateProductQuantity(cid, pid, quantity);

        if (!updatedCart) {
            return res.status(404).json({ message: 'Cart or product not found' });
        }

        res.status(200).json({ message: 'Product quantity updated', cart: updatedCart });
    } catch (error) {
        res.status(500).json({ error });
    }
});




export default router;